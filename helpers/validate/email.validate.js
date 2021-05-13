const models = require('../../db/connection');

const emailRegexp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

module.exports = {
	checkEmailExisted: async (email) => {
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
			console.log(error);
			return true;
		}
	},

	checkValidEmail: (email) => {
		return emailRegexp.test(email);
	},
};
