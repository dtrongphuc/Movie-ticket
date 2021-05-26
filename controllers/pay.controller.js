const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
class PayController {

    async addBooking(req, res) {
        
		var data = req.body;
        var userId = req.user;

		await models.Booking.create({

			time: data.order-time,
			total: data.order-total,
			userId: userId,
			showtimeId: 1,

		});

        await models.Ticket.create({
            seatId: data.time,
            price: data.order-price,
            bookingId: '1bbd5d66-efa4-4bfa-85da-c7161be4029a',
        });

		res.redirect('/ticket/order');
	}

}

module.exports = new PayController 
