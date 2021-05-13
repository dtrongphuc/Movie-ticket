const models = require('../db/connection');

module.exports = {
	// login
	getLogin: (req, res) => {
		res.render('auth/login', { message: res.locals.message });
	},

	postLogin: (req, res) => {
		const { message } = req.session;
		if (message) {
			return res.redirect(301, '/auth/login');
		}
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
