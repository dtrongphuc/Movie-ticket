const { Sequelize, Op } = require('sequelize');
const {
	Showtime,
	Movie,
	Ticket,
	Booking,
	sequelize,
} = require('../../db/connection');
const moment = require('moment');

module.exports = {
	topMovies: async (req, res) => {
		try {
			// skip $offset, fetch $limit item
			const { offset, limit } = req.query;
			const movies = await Movie.findAll({
				where: {
					openingDay: {
						[Op.lt]: Date.now(),
					},
				},
				attributes: {
					include: [
						[
							Sequelize.fn(
								'COUNT',
								Sequelize.col('showtimes->booking->ticket.id')
							),
							'sold',
						],
					],
				},
				include: [
					{
						model: Showtime,
						attributes: [],
						include: [
							{
								model: Booking,
								attributes: [],
								include: [
									{
										model: Ticket,
										attributes: [],
									},
								],
							},
						],
					},
				],
				group: ['movie.id'],
				order: [[sequelize.literal('sold'), 'DESC']],
				offset: offset || 0,
				limit: limit || 8,
				subQuery: false,
			});

			res.status(200).json({ movies });
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error,
			});
		}
	},

	countHotMovies: async (req, res) => {
		try {
			const movies = await Movie.findAll({
				where: {
					openingDay: {
						[Op.lt]: Date.now(),
					},
				},
				attributes: {
					include: [
						[
							Sequelize.fn(
								'COUNT',
								Sequelize.col('showtimes->booking->ticket.id')
							),
							'sold',
						],
					],
				},
				include: [
					{
						model: Showtime,
						attributes: [],
						include: [
							{
								model: Booking,
								attributes: [],
								include: [
									{
										model: Ticket,
										attributes: [],
									},
								],
							},
						],
					},
				],
				group: ['movie.id'],
				order: [[sequelize.literal('sold'), 'DESC']],
				subQuery: false,
			});

			return res.status(200).json({
				count: movies.length,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error,
			});
		}
	},

	newOpeningMovies: async (req, res) => {
		try {
			// skip $offset, fetch $limit item
			const { offset, limit } = req.query;
			const movies = await Movie.findAll({
				where: {
					openingDay: {
						[Op.gte]: moment().subtract(30, 'days').toDate(),
					},
				},
				order: [['openingDay', 'DESC']],
				offset: offset || 0,
				limit: limit || 8,
				subQuery: false,
			});

			res.status(200).json({ movies });
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error,
			});
		}
	},

	countNewOpeningMovies: async (req, res) => {
		try {
			const movies = await Movie.findAll({
				where: {
					openingDay: {
						[Op.gte]: moment().subtract(30, 'days').toDate(),
					},
				},
				order: [['openingDay', 'DESC']],
			});

			return res.status(200).json({
				count: movies.length,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error,
			});
		}
	},
};
