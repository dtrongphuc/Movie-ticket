const models = require('../db/connection');
class PayController {
	async addBooking(req, res, next) {
		try {
			var today = new Date();
			var date =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate();
			var data = req.body;
			var seats = data.ordernumberSeat
				.slice(0, data.orderseat.length - 2)
				.split(',');
			var userId = req.user?.id;

			let showtime = await models.Showtime.findByPk(data.ordershowtimeId);
			let newBooking = await models.Booking.create({
				time: date,
				total: 0,
				userId: userId,
				showtimeId: data.ordershowtimeId,
			});

			let tickets = await Promise.all(
				[...Array(seats.length).keys()].map(async (i) => {
					return await models.Ticket.create({
						seatId: seats[i],
						price: showtime.fare,
						bookingId: newBooking.id,
					});
				})
			);

			const totalPrice = tickets.reduce(
				(total, ticket) => total + parseInt(ticket.price),
				0
			);
			newBooking.total = totalPrice;
			await newBooking.save();
			return res.redirect(
				'/ticket/order?error=' + encodeURIComponent('Incorrect')
			);
		} catch (error) {
			return res.redirect(
				'/ticket/order?error=' + encodeURIComponent('NoIncorrect')
			);
		}
	}
}

module.exports = new PayController();
