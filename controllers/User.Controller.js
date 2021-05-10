class CinemaController {
	async index(req, res, next) {
		res.render('user/Profile');
	}
}

module.exports = new CinemaController();