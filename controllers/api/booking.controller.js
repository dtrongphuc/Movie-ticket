const { Op } = require('sequelize');
const models = require('../../db/connection');
const moment = require('moment');

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
			let theater = await models.Theater.findByPk(+theaterId);

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

	getShowtimeMovies: async (req, res) => {
		try {
			let showtime = await models.Showtime.findAll({
				where: {
					startTime: {
						[Op.gte]: Date.now(),
					},
				},
				include: models.Movie,
				attributes: ['movie.id'],
				group: ['movie.id'],
			});

			let movies = await Promise.all(
				showtime?.map(async (st) => {
					return {
						id: st.movie.id,
						name: st.movie.name,
					};
				})
			);

			return res.status(200).json({
				success: true,
				movies: movies,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},

	getMoviesByDateAndCinema: async (req, res) => {
		try {
			// ?date=''?cinema=''
			const { date, cinema } = req.query;

			if (!date || !cinema) {
				return res.status(500).json({
					success: false,
					message: 'date and cinema required',
				});
			}

			let showtime = await models.Showtime.findAll({
				where: {
					startTime: {
						[Op.and]: [
							{
								[Op.gte]: moment(date, 'YYYYMMDD').format(),
							},
							{
								[Op.gte]: Date.now(),
							},
						],
					},
					cinemaId: cinema,
				},
				include: models.Movie,
				attributes: ['movie.id'],
				group: ['movie.id'],
			});

			let movies = await Promise.all(
				showtime?.map(async (st) => {
					return {
						id: st.movie.id,
						name: st.movie.name,
					};
				})
			);

			return res.status(200).json({
				success: true,
				movies: movies,
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
