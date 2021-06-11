const models = require('../db/connection');
const moment = require('moment');
const { Op, QueryTypes } = require('sequelize');

class HomeController {
	async index(req, res) {

		var query = `select mv."id", count(tk."seatId"),mv.* from movies as mv 
						join showtimes as st on mv.id = st."movieId"
						join bookings as bk on bk."showtimeId" = st.id 
						join tickets tk on tk."bookingId" = bk.id 
						group by mv."id"
						order by count(tk."seatId") ASC`;

		var movies = await models.sequelize.query(query, {
			raw: false,
			type: QueryTypes.SELECT,
		})
		return res.render('content/content', { movies: movies });
	}

	async indexNew(req, res) {
		models.Movie.findAll({
			where: {
				openingDay: {
					 [Op.gte]:  moment().subtract(30, 'days').toDate()
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
				return res.render('content/detail', { movie: movie });
			})
			.catch(() => {
				res.status(500).send({ error: 'Something failed!' });
			});
	}
}

module.exports = new HomeController();
