const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
class PayController {

	async addBooking(req, res,next) {
		const bookingId = await models.Booking.count({});
		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var seats = [];
		var data = req.body;
		var userId = req.user;
		seats = data.orderseat;

		await models.Booking.create({
			id: bookingId + 1,
			time: date,
			total: data.ordertotal,
			userId: userId,
			showtimeId: 1,

		});

		await models.Ticket.create({

			seatId: seats,
			price: data.orderprice,
			bookingId: bookingId,
			
		});
		res.redirect('/ticket/order');
		//next();
	}
	
}

module.exports = new PayController
