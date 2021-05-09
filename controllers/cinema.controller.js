class CinemaController {
	async index(req, res, next) {
		res.render('cinema/detail');
	}
}

module.exports = new CinemaController();
