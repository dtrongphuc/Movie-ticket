const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const randomstring = require('randomstring');
const { User } = require('../db/connection');
const { sendMail } = require('../helpers/mailer');

module.exports = {
	// login
	getLogin: (req, res) => {
		res.render('auth/login', { message: res.locals.message });
	},

	postLogin: async (req, res) => {
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
			const verifyString = randomstring.generate(12);

			let user = await User.create({
				email: data.email,
				hashedPassword: data.hashedPassword,
				fullname: data.fullname,
				phoneNumber: data.phoneNumber,
				role: 'member',
				verifyString: verifyString,
			});

			const verifyLink = `${req.protocol}://${req.get('host')}/auth/verify/${
				user?.id
			}/${verifyString}`;

			let status = await sendMail(
				user?.email,
				'Xác thực tài khoản',
				`Vui lòng xác thực tài khoản qua liên kết: ${verifyLink}`,
				`Vui lòng xác thực tài khoản qua liên kết: <a href=${verifyLink}>Xác thực</a>`
			);

			return res.render('auth/login', {
				message: {
					content: 'Vui lòng kiểm tra thư xác thực tài khoản',
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

	verifyAccount: async (req, res) => {
		try {
			const { id, verifyString } = req.params;
			let user = await User.findOne({
				where: {
					[Op.and]: [{ id: id, verifyString: verifyString }],
				},
			});

			if (!user) {
				return res.render('auth/verify', {
					message: {
						content: 'Mã xác nhận không hợp lệ',
						type: 'error',
					},
				});
			}

			user.verifyString = null;
			user.active = true;
			await user.save();

			return res.render('auth/verify', {
				message: {
					content: 'Xác thực tài khoản thành công',
					type: 'success',
				},
			});
		} catch (error) {
			return res.render('auth/verify', {
				message: {
					content: 'Mã xác nhận không hợp lệ',
					type: 'error',
				},
			});
		}
	},

	getForgotPwdForm: (req, res) => {
		res.render('auth/forgotPwd');
	},

	getResetPwdForm: async (req, res) => {
		try {
			const { id, verifyString } = req.params;
			let user = await User.findOne({
				where: {
					[Op.and]: [{ id: id, verifyString: verifyString }],
				},
			});

			if (!user) {
				return res.render('auth/verify', {
					message: {
						content: 'Mã xác nhận không hợp lệ',
						type: 'error',
					},
				});
			}

			user.verifyString = null;
			user.active = true;
			await user.save();
			req.session.sessionId = id;

			return res.render('auth/resetPwd', {
				message: null,
			});
		} catch (error) {
			return res.render('auth/verify', {
				message: {
					content: 'Mã xác nhận không hợp lệ',
					type: 'error',
				},
			});
		}
	},

	postForgotPwd: async (req, res) => {
		try {
			const { email } = req.body;
			let user = await User.findOne({
				where: {
					email: email,
				},
			});

			if (!user) {
				return res.render('auth/verify', {
					message: {
						content: 'Tài khoản không tồn tại',
						type: 'error',
					},
				});
			}

			const verifyString = randomstring.generate(12);
			const verifyLink = `${req.protocol}://${req.get('host')}/auth/reset-pwd/${
				user?.id
			}/${verifyString}`;

			user.verifyString = verifyString;

			await Promise.all([
				user.save(),
				sendMail(
					user?.email,
					'Quên mật khẩu',
					`Vui lòng xác thực qua liên kết: ${verifyLink}`,
					`Vui lòng xác thực qua liên kết: <a href=${verifyLink}>Xác thực</a>`
				),
			]);
			
			return res.render('auth/forgotPwd', {
				message: {
					content: 'Vui lòng kiểm tra thư xác nhận',
					type: 'success',
				},
			});
		} catch (error) {
			console.log(error);
			return res.render('auth/forgotPwd', {
				message: {
					content: 'Có lỗi xảy ra',
					type: 'error',
				},
			});
		}
	},

	postResetPwd: async (req, res) => {
		try {
			const userId = req.session.sessionId;
			const { password, confirmPassword } = req.body;

			let user = await User.findByPk(userId);

			if (!user) {
				return res.render('auth/resetPwd', {
					message: {
						content: 'Có lỗi xảy ra',
						type: 'error',
					},
				});
			}

			if (!password || password !== confirmPassword) {
				return res.render('auth/resetPwd', {
					message: {
						content: 'Mật khẩu không hợp lệ',
						type: 'error',
					},
				});
			}

			user.hashedPassword = await bcrypt.hash(password, 10);

			await user.save();
			delete req.session.sessionId;
			if(user.role == 'admin'){
				return res.redirect('/admin/dang-nhap');
			}else{
				return res.redirect('/auth/login');
			}
		} catch (error) {
			console.log(error);
			return res.render('auth/verify', {
				message: {
					content: 'Mã xác nhận không hợp lệ',
					type: 'error',
				},
			});
		}
	},
};
