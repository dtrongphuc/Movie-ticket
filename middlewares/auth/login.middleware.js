const { passport } = require('../passport/index');

module.exports = {
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

	localLogin: (req, res, next) => {
		passport.authenticate('local-login', (error, user, info) => {
			const { email, password } = req.body;
			if (!email || !password) {
				req.session.message = {
					content: 'Vui lòng điền đầy đủ dữ liệu',
					type: 'error',
				};
			} else if (error) {
				req.session.message = error;
			} else if (!user) {
				req.session.message = info;
			} else {
				req.logIn(user, function (err) {
					if (err) {
						req.session.message = err;
					}
				});
			}

			next();
		})(req, res, next);
	},

	googleLogin: (req, res, next) => {
		passport.authenticate('google', (error, profile, info) => {
			if (error) {
				req.session.message = error;
			} else if (!profile) {
				req.session.message = info;
			} else {
				req.logIn(profile, function (err) {
					if (err) {
						req.session.message = err;
					}
				});
			}

			next();
		})(req, res, next);
	},

	facebookLogin: (req, res, next) => {
		passport.authenticate('facebook', (error, profile, info) => {
			if (error) {
				req.session.message = error;
			} else if (!profile) {
				req.session.message = info;
			} else {
				req.logIn(profile, function (err) {
					if (err) {
						req.session.message = err;
					}
				});
			}

			next();
		})(req, res, next);
	},
};
