const models = require('../db/connection');
const moment = require('moment');
const { Op, QueryTypes, Sequelize } = require('sequelize');
const {
	Showtime,
	Movie,
	Ticket,
	Booking,
	sequelize,
} = require('../db/connection');

class HomeController {
	async index(req, res) {
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
				offset: 0,
				limit: 8,
				subQuery: false,
			});

			return res.render('content/content', { movies: movies });
		} catch (error) {
			console.log(error);
			return res.redirect('/404');
		}
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
	}

	async indexNew(req, res) {
		models.Movie.findAll({
			where: {
				openingDay: {
					[Op.gte]: moment().subtract(30, 'days').toDate(),
				},
			},
			order: [['openingDay', 'ASC']],
		})
			.then((movies) => {
				return res.render('content/contentNew', { movies: movies });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send({ error: 'Something failed!' });
			});
	}

	async detail(req, res, next) {
		const id = req.params.id;

		models.Movie.findOne({
			where: { id: id },
			include: [
				{
					model: models.Image,
				},
			],
		})
			.then((movie) => {
				return res.render('movie/detail', { movie: movie });
			})
			.catch(() => {
				res.status(500).send({ error: 'Something failed!' });
			});
	}
}

module.exports = new HomeController();
