const models = require('../db/connection');
const {
	getAccessTokenFromCode,
	getGoogleUserInfo,
} = require('../helpers/googleToken/index');

module.exports = {
	// login
	getLogin: (req, res) => {
		const { googleLoginUrl } = res.locals;
		res.render('auth/login', { googleLoginUrl: googleLoginUrl, message: null });
	},

	getLoginWithGoogle: async (req, res) => {
		const { code, error } = req.query;

		if (!!error) {
			console.log(`An error occurred: ${error}`);
		} else {
			console.log(`The code is: ${code}`);
		}
		const accessToken = await getAccessTokenFromCode(code);
		const userInfo = await getGoogleUserInfo(accessToken);

		res.send('index');
	},

	postLogin: (req, res) => {
		const { message, googleLoginUrl } = res.locals;
		if (message) {
			return res.render('auth/login', {
				message: message,
				googleLoginUrl: googleLoginUrl,
			});
		}
		// console.log(req.cookies);
		return res.redirect('/');
	},

	// register
	getRegister: (req, res) => {
		res.render('auth/register', {
			message: null,
		});
	},

	postRegister: async (req, res) => {
		try {
			const { error, data } = res.locals;
			if (error) {
				return res.render('auth/register', {
					message: {
						content: error,
						type: 'error',
					},
				});
			}

			await models.User.create({
				email: data.email,
				hashedPassword: data.hashedPassword,
				fullname: data.fullname,
				phoneNumber: data.phoneNumber,
				role: 'member',
			});

			return res.render('auth/register', {
				message: {
					content: 'Đăng ký tài khoản thành công',
					type: 'success',
				},
			});
		} catch (error) {
			return res.render('auth/register', {
				message: {
					content: error,
					type: 'error',
				},
			});
		}
	},
};
