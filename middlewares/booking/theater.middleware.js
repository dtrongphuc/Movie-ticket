const { Theater } = require('../../db/connection');

module.exports = {
	getTheaters: async (req, res, next) => {
		try {
			let theaters = await Theater.findAll();
			res.locals.theaters = theaters;
		} catch (error) {
			console.log(error);
			res.locals.message = error;
		} finally {
			next();
		}
	},
};
