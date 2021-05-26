const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');

class PayController {

    async addBooking(req, res) {

		var data = req.body.time;
        var userId = req.user;
        console.log(data );

		// await models.Booking.create({

		// 	time: data.time,
		// 	total: data.total,
		// 	userId: userId,
		// 	showtimeId: 1,
           
		// });
        // await models.Ticket.create({
        //     seatId: data.time,
        //     price: data.total,
        //     bookingId: '1bbd5d66-efa4-4bfa-85da-c7161be4029a',
        // });
        
		res.redirect('/ticket/order');
	}

}

module.exports = new PayController 
