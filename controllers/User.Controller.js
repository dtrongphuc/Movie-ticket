const { User } = require('../db/connection');

class CinemaController {
	async profile(req, res, next) {
		const { id } = req.params;

		User.findOne({where : {id: id}})
			.then(user => {
				res.render('user/Profile', {user, });
			})
			.catch(() => res.send('loi'))


		
	}
}

module.exports = new CinemaController();
