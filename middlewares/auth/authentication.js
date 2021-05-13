const { User } = require('../../db/connection');

module.exports = {
	isAuth: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		return res.redirect('/auth/login');
	},

	isActive: async (req, res, next) => {
		try {
			const { email } = req.body;
			let user = await User.findByEmail(email);
			if (!user?.active) {
				return res.render('auth/login', {
					message: {
						content: 'Tài khoản chưa được xác thực',
						type: 'error',
					},
				});
			}

			next();
		} catch (error) {
			console.log(error);
			return res.render('auth/login', {
				message: {
					content: 'Tài khoản chưa được xác thực',
					type: 'error',
				},
			});
		}
	},
};
