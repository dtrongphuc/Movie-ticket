const { User } = require('../../db/connection');

module.exports = {
	isAuth: (req, res, next) => {
		if (req.url.includes('/admin')) {
			return next();
		}
		if (req.isAuthenticated()) {
			const user = req.user;
			res.locals.currentUser = user;
			return next();
		}
		return res.redirect('/auth/login');
	},

	isActive: async (req, res, next) => {
		try {
			const { email } = req.body;
			let user = await User.findByEmail(email);
			if (user && !user.active) {
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
