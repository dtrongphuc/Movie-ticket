const models = require('../db/connection');

class CinemaController {
	async index(req, res, next) {
		// test database
		// const user = await models.User.findByPk(1);
		// console.log(user);

		res.render('user/Profile');
	}
}

module.exports = new CinemaController();
