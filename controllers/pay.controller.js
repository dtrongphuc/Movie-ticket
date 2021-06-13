const models = require('../db/connection');
const { transporter } = require('../helpers/mailer');
const hbs = require('nodemailer-express-handlebars');

async function sendBill(email) {
	try {
		let options = {
			viewEngine: {
				extname: '.handlebars',
				defaultLayout: '',
				layoutsDir: '',
			},
			viewPath: 'views/template/',
		};
		transporter.use('compile', hbs(options));

		const info = await transporter.sendMail({
			from: '"Lotteria Movie" <lotteria@mail.com>', // sender address
			to: email, // list of receivers
			subject: 'Đặt vé thành công', // Subject line
			template: 'bill',
			context: {
				name: '',
				bookingId: '',
				date: '',
				tickets: [],
				total: '',
				support_url: '',
			},
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.log(error);
	}
}
class PayController {
	async addBooking(req, res) {
		try {
			var today = new Date();
			var date =
				today.getFullYear() +
				'-' +
				(today.getMonth() + 1) +
				'-' +
				today.getDate();
			var data = req.body;
			var seats = `${data.ordernumberSeat}`.split(',');
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
			await sendBill(req.user?.email);
			return res.redirect('/ticket/order/success');
		} catch (error) {
			console.log(error);
			res.locals.message = 'Đã có lỗi xảy ra';
			return res.render('ticket/order');
		}
	}
}

module.exports = new PayController();
