const { Sequelize, Op } = require('sequelize');
const {
	Showtime,
	Movie,
	Ticket,
	Booking,
	sequelize,
} = require('../../db/connection');

module.exports = {
	topMovie: async (req, res) => {
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

			// var query = `select mv."id", count(tk."seatId"),mv.* from movies as mv
			// 				join showtimes as st on mv.id = st."movieId"
			// 				join bookings as bk on bk."showtimeId" = st.id
			// 				join tickets tk on tk."bookingId" = bk.id
			// 				group by mv."id"
			// 				order by count(tk."seatId") ASC`;

			// var movies = await models.sequelize.query(query, {
			// 	raw: false,
			// 	type: QueryTypes.SELECT,
			// });

			res.status(200).json({ movies });
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error,
			});
		}
	},
};
