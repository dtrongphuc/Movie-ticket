const bcrypt = require('bcrypt');

module.exports = {
	comparePassword: async (password, hashedPassword) => {
		let check = await bcrypt.compare(password, hashedPassword);
		return check;
	},
};
