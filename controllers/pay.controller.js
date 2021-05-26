const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
class PayController {

    async addBooking(req, res) {

		var today = new Date();
		var date =  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var seats = [];
		var data = req.body;
        var userId = req.user;
		seats = data.orderseat;
		for(var j = 0; seats.lenght; j++){
			console.log("a" + seats[i]);
		}


		await models.Booking.create({

			time: date,
			total: data.ordertotal,
			userId: userId,
			showtimeId: 1,

		});

		for(var i = 0; seats.lenght; i++){
			await models.Ticket.create({
				seatId: seats[i],
				price: data.orderprice,
				bookingId: '9c938e37-5c17-4923-afb6-0fc193e1062b',
			});
		}

		res.redirect('/ticket/order');
	}

}

module.exports = new PayController 
