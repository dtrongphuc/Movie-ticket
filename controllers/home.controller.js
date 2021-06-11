const models = require('../db/connection');
const moment = require('moment');
const { Op } = require('sequelize');

class HomeController {
	async index(req, res) {
		models.Movie.findAll({
			include: [
				{
					model: models.Image,
					where: {},
				},
			],
		})
			.then((movies) => {
				return res.render('content/content', { movies: movies });
			})
			.catch(() => {
				res.status(500).send({ error: 'Something failed!' });
			});
	}

	async indexNew(req, res) {
		models.Movie.findAll({
			where: {
				openingDay: {
					[Op.gt]: moment().add(1, 'days'),
				},
			},
			order: [['openingDay', 'ASC']],
		})
			.then((mvs) => {
				let movies = mvs.map((movie) => {
					let moviePlain = movie.get({ plain: true });
					return {
						...moviePlain,
						daysleft: moment(moviePlain.openingDay).diff(Date.now(), 'days'),
					};
				});
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
