const bcrypt = require('bcrypt');
const models = require('../../db/connection');

const emailRegexp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const checkEmailExisted = async (email) => {
	try {
		let user = models.User.findOne({
			where: {
				email: email,
			},
		});
		if (user) {
			return false;
		}
	} catch (error) {
		return true;
	}
};

const hashPassword = async (plainPassword) => {
	let hashedPassword = await bcrypt.hash(plainPassword, 10);
	return hashedPassword;
};

module.exports = {
	validate: async (req, res, next) => {
		const { email, password, confirmPassword, fullname, phoneNumber } =
			req.body;
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
