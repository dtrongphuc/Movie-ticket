const queryString = require('query-string');

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

		if (!email || !password || !confirmPassword || !fullname || !phoneNumber) {
			error = 'Vui lòng điền đầy đủ dữ liệu';
		} else if (await checkEmailExisted(email)) {
			error = 'Email đã tồn tại';
		} else if (password !== confirmPassword) {
			error = 'Mật khẩu xác nhận không khớp';
		} else if (!emailRegexp.test(email)) {
			error = 'Email không hợp lệ';
		}

		res.locals.error = error;

		if (!error) {
			let hashedPassword = await hashPassword(password);

			res.locals.data = {
				email,
				hashedPassword,
				fullname,
				phoneNumber,
			};
		}

		next();
	},
};
