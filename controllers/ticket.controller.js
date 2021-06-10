
const express = require('express');
const models = require('../db/connection');
const { Sequelize, QueryTypes } = require('sequelize');

module.exports = {
  
	getBooking: (req, res) => {
		return res.render('ticket/book');
	},

	async bookseat(req, res) {

        var movieId =  req.query.movieId;
        var cinemaId = req.query.cinemaId;

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
        return res.render('ticket/bookseat' , {result : result });

	},

	order: (req, res) => {
		return res.render('ticket/order');

	},
};
