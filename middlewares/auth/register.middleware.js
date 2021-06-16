const bcrypt = require('bcrypt');
const {
	checkEmailExisted,
	checkValidEmail,
} = require('../validate/email.validate');

const hashPassword = async (plainPassword) => {
	let hashedPassword = await bcrypt.hash(plainPassword, 10);
	return hashedPassword;
};

module.exports = {
	validate: async (req, res, next) => {
		const { email, password, confirmPassword, fullname, phoneNumber } =
			req.body;
		let error = '';
		let isExisted = await checkEmailExisted(email);
		if (!email || !password || !confirmPassword || !fullname || !phoneNumber) {
			error = 'Vui lòng điền đầy đủ dữ liệu';
		} else if (isExisted) {
			error = 'Email đã tồn tại';
		} else if (password !== confirmPassword) {
			error = 'Mật khẩu xác nhận không khớp';
		} else if (!checkValidEmail(email)) {
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
