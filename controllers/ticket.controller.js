
const express = require('express');
const models = require('../db/connection');
const { Sequelize, QueryTypes } = require('sequelize');
const Session = require('./api/sessionSeat.controller');

module.exports = {

	getBooking: (req, res) => {
		return res.render('ticket/book');
	},

	async bookseat(req, res) {
        //const session = Session.getSession;
        var movieId =  5;
        var cinemaId = 10;

        var query = `Select tk."seatId" from tickets as tk join bookings as bk on bk.id = tk."bookingId" 
						join showtimes as st on bk."showtimeId" = st.id Where st."movieId" = :movieId and st."cinemaId" = :cinemaId`;
        var result = await models.sequelize.query(query,
            {
				replacements: { 
                    movieId: movieId,
                    cinemaId: cinemaId
                 },
                raw: false,
                type: QueryTypes.SELECT
            }
        )

		const auth = sessionStorage.setItem('seatSession', JSON.stringify(result));

		return res.render('ticket/bookseat');
	},

	order: (req, res) => {
		return res.render('ticket/order');
	},
};
