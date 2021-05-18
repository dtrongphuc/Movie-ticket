const models = require("../db/connection");

class MovieController {
	async index(req, res, next) {
		const { id } = req.query;

		models.Movie.findOne({
			where: {id: id},
			include: [
				{
					model: models.Image,
				}
			]
		})
		.then(movie => {
			return res.render('movie/detail', {movie, });
		})
		.catch(() => {
			res.status(500).send({ error: 'Something failed!' })
		})
	}
}

module.exports = new MovieController();
