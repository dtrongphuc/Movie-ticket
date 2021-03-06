const {
	User,
	Cinema,
	Booking,
	Ticket,
	Showtime,
	Movie,
	Theater,
} = require('../db/connection');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const cinema = require('../models/cinema.model');

const comparePassword = async (plainPassword, hashedPassword) => {
	let check = await bcrypt.compare(plainPassword, hashedPassword);
	return check;
};
const hashPassword = async (plainPassword) => {
	let hashedPassword = await bcrypt.hash(plainPassword, 10);
	return hashedPassword;
};
class UserController {
	async profile(req, res, next) {
		const { id } = req.params;

		//test MODEL
		const joins = await Booking.findAll({
			where: { userId: id },
			include: [
				{
					model: Showtime,
					// attributes: []
					include: [
						{
							model: Movie,
							attributes: ['name'],
						},
						{
							model: Cinema,
							attributes: ['name'],
							include: [
								{
									model: Theater,
									attributes: ['name'],
								},
							],
						},
					],
				},
				{
					model: Ticket,
					attributes: ['seatId'],
				},
			],
			attributes: ['time'],
		});

		//test QUERY
		// const query = `select book."userId", mo."name" movieName, ci."name" cinemaName, th."name" theaterName, book."time", ti."seatId"
		//                   from bookings book join showtimes shows on book."showtimeId" = shows.id
		//                   join movies mo on mo.id = shows."movieId"
		//                   join cinemas ci on ci.id = shows."cinemaId"
		//                   join tickets ti on ti."bookingId" = book.id
		//                   join theaters th on th.id = ci."theaterId"
		//                   where book."userId" = :userid`;
		// const historyBooking = await models.sequelize.query(query, {
		//   replacements: {
		//     userid: "32465435-f596-4f39-985e-eae06a589b2b",
		//   },
		//   raw: false,
		//   type: QueryTypes.SELECT,
		// });

		User.findOne({ where: { id: id } })
			.then((user) => {
				res.render('user/Profile', { user, joins });
			})
			.catch(() => res.send('loi'));
	}
	async updateprofile(req, res, next) {
		const currentuser = req.user;
		const formData = req.body;

		User.findOne({ where: { id: currentuser.id } })
			.then(async (user) => {
				//c???p nh???t
				user.fullname = formData.name;
				user.phoneNumber = formData.phone;
				await user.save();

				return res.status(200).json();
			})
			.catch(() => res.status(400).json());

		// return res.status(200).json({a: '1'});
	}
	async changePass(req, res, next) {
		const currentuser = req.user;
		const formData = req.body;
		let err_oldPass = '';
		let err_newPass = '';
		let err_confirm = '';
		User.findOne({ where: { id: currentuser.id } })
			.then(async (user) => {
				if (
					!(await comparePassword(formData.old_password, user.hashedPassword))
				) {
					err_oldPass = 'M???t kh???u c??? kh??ng ch??nh x??c';
				}
				if (formData.new_password != formData.confirm) {
					err_confirm = 'M???t kh???u m???i kh??ng kh???p';
				}

				if (!err_oldPass && !err_newPass && !err_confirm) {
					let new_hassPassword = await hashPassword(formData.new_password);
					user.hashedPassword = new_hassPassword;
					user.save();
					return res.status(200).json();
				} else {
					return res
						.status(400)
						.json({ err_newPass, err_oldPass, err_confirm });
				}
			})
			.catch(() => res.status(400).json());

		// return res.status(200).json({a: '1'});
	}
	async addPass(req, res, next) {
		const currentuser = req.user;
		const formData = req.body;
		let err_Pass = '';
		let err_confirm = '';

		if (formData.password != formData.confirm) {
			err_confirm = 'M???t kh???u m???i kh??ng kh???p';
		}

		if (!err_Pass && !err_confirm) {
			let new_hassPassword = await hashPassword(formData.password);
			currentuser.hashedPassword = new_hassPassword;
			currentuser.save();
			return res.status(200).json();
		} else {
			return res.status(400).json({ err_Pass, err_confirm });
		}
	}
}

module.exports = new UserController();
