const express = require('express');
const models = require('../db/connection');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../db/connection');
class PayController {

	async addBooking(req, res,next) {
		//const bookingId = await models.Booking.count({});
		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var data = req.body;
		var seats = data.ordernumberSeat.slice(0, data.orderseat.length - 2).split(',');
		var userId = req.user?.id;

		try{

			const booking =  await models.Booking.create({
				//id: bookingId + 1,
				time: date,
				total: data.ordertotal,
				userId: userId,
				showtimeId: data.ordershowtimeId,
	
			});
			for(var i = 0; i < seats.length ; i++){
				await models.Ticket.create({
					seatId: seats[i],
					price: data.orderprice,
					bookingId: booking.id,
					
				});
			}
			res.redirect('/ticket/order?error=' + encodeURIComponent('Incorrect'));

		}catch(error){

			res.redirect('/ticket/order?error=' + encodeURIComponent('NoIncorrect'));

		}
		
	}

}

module.exports = new PayController
