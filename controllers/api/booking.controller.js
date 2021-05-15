const models = require('../../db/connection');

module.exports = {
	getAllTheaters: async (req, res) => {
		try {
			let theaters = await models.Theater.findAll();
			return res.status(200).json({
				success: true,
				theaters,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},

	getCinemasByTheaterId: async (req, res) => {
		try {
			const { theaterId } = req.query;
			if (!theaterId) {
				throw new Error('id is required');
			}
			let theater = await models.Theater.findByPk(theaterId);

			let cinemas = await theater.getCinemas();

			return res.status(200).json({
				success: true,
				cinemas,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},
};
