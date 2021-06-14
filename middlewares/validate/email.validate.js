const models = require('../../db/connection');

const emailRegexp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

module.exports = {
	checkEmailExisted: async (email) => {
		try {
			let count = await models.User.count({
				where: {
					email: email,
				},
			});

			if (count > 0) {
				return true;
			}

			return true;
		} catch (error) {
			console.log(error);
			return true;
		}
	},

	checkValidEmail: (email) => {
		return emailRegexp.test(email);
	},
};
