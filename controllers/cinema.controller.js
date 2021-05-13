const {
	Movie,
} = require("../db/connection");

class CinemaController {
	async index(req, res, next) {
		const { id } = req.query;

		await Movie.findOne({where: {id: id}})
			.then(movie => {
				return res.render('cinema/detail', {movie, });
			})
			.catch(() => {
				res.status(500).send({ error: 'Something failed!' })
			})
	}
}

module.exports = new CinemaController();
