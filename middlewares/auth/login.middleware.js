const queryString = require('query-string');
const { passport } = require('../passport/index');
const bcrypt = require('bcrypt');

module.exports = {
	getGoogleLoginUrl: (req, res, next) => {
		try {
			const stringifiedParams = queryString.stringify({
				client_id: process.env.GOOGLE_CLIENT_ID,
				redirect_uri: 'http://localhost:4000/auth/google',
				scope: [
					'https://www.googleapis.com/auth/userinfo.email',
					'https://www.googleapis.com/auth/userinfo.profile',
				].join(' '), // space seperated string
				response_type: 'code',
				access_type: 'offline',
				prompt: 'consent',
			});

			const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
			res.locals.googleLoginUrl = googleLoginUrl;
		} catch (error) {
			console.log('get google login url error', error);
		} finally {
			next();
		}
	},

	validate: async (req, res, next) => {
		const { email, password } = req.body;

		let error = '';

		if (!email || !password) {
			error = 'Vui lòng điền đầy đủ dữ liệu';
		} else if (!emailRegexp.test(email)) {
			error = 'Email không hợp lệ';
		} else if (!(await checkEmailExisted(email))) {
			error = 'Tài khoản hoặc mật khẩu không chính xác';
		}

		res.locals.error = error;

		next();
	},

	login: (req, res, next) => {
		passport.authenticate('local-login', (error, user, info) => {
			const { username, password } = req.body;

			if (!username || !password) {
				res.locals.message = {
					content: 'Vui lòng điền đầy đủ dữ liệu',
					type: 'error',
				};
			} else if (error) {
				res.locals.message = error;
			} else if (!user) {
				res.locals.message = info;
			} else {
				req.logIn(user, function (err) {
					if (err) {
						res.locals.message = err;
					}
				});
			}

			next();
		})(req, res, next);
	},
};
