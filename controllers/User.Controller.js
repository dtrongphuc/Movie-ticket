const { User } = require('../db/connection');

class UserController {
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

		User.findOne({where : {id: '32465435-f596-4f39-985e-eae06a589b2b'}})
			.then(async user => {
				//cập nhật
				// user.fullname = formData.fullname;
				// user.phoneNumber = formData.phone;
				// await user.save();

				return res.status(200).json();
			})
			.catch(() => res.status(400).json())	

		// return res.status(200).json({a: '1'});
	}
}

module.exports = new UserController();
