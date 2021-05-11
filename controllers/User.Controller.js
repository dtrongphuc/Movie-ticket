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
	async updateprofile(req, res, next) {
		const formData = req.body;
		return res.status(200).json({a: '1'});
	}
}

module.exports = new CinemaController();
