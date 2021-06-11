const express = require('express');
const models = require('../db/connection');
const { Sequelize, QueryTypes } = require('sequelize');

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
		return res.render('ticket/bookseat', { result: result });
	},

	order: (req, res) => {
		return res.render('ticket/order');
	},
};
