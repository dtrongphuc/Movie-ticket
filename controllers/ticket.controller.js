const { QueryTypes } = require('sequelize');
const models = require('../db/connection');

module.exports = {
	getBooking: (req, res) => {
		return res.render('ticket/book');
	},

	async bookseat(req, res) {
		var idShowTime = req.query.showtime;
		if (!idShowTime) {
			return res.redirect('/404');
		}

		var query = `Select tk."seatId" from tickets as tk join bookings as bk on bk.id = tk."bookingId" 
						join showtimes as st on bk."showtimeId" = st.id Where st."id" = :showtime`;

		var result = await models.sequelize.query(query, {
			replacements: {
				showtime: idShowTime,
			},
			raw: false,
			type: QueryTypes.SELECT,
		});

		let showtime = await models.Showtime.findByPk(idShowTime);
		let cinema = await models.Cinema.findByPk(showtime.cinemaId);

		return res.render('ticket/bookseat', {
			result: result,
			cinema: {
				width: cinema.width,
				length: cinema.length,
			},
		});
	},

	order: (req, res) => {
		return res.render('ticket/order');
	},
};
