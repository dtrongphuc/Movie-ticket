const models = require('../db/connection');
const { transporter } = require('../helpers/mailer');
const hbs = require('nodemailer-express-handlebars');
const moment = require('moment');

async function sendBill(email, data) {
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
				name: data.name,
				bookingId: data.bookingId,
				date: data.date,
				tickets: data.tickets,
				total: data.total,
				support_url: data.support_url,
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
			var data = req.body;
			var seats = `${data.ordernumberSeat}`.split(',');
			var userId = req.user?.id;

			let showtime = await models.Showtime.findByPk(data.ordershowtimeId);
			let newBooking = await models.Booking.create({
				time: Date.now(),
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
			let [saveBooking, movie, cinema] = await Promise.all([
				newBooking.save(),
				models.Movie.findByPk(showtime.movieId),
				models.Cinema.findByPk(showtime.cinemaId),
			]);

			let mailTickets = tickets.map((ticket) => {
				let value = ticket.get({ plain: true });
				return {
					...value,
					price: new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(ticket.price),
					movieName: movie.name,
					cinemaName: cinema.name,
					startTime: moment(showtime.startTime).format('HH:mm DD/MM/YYYY'),
				};
			});

			let mailData = {
				name: req.user?.fullname || req.user?.email,
				bookingId: newBooking.id,
				date: moment(newBooking.createdAt).format('HH:mm DD/MM/YYYY'),
				tickets: mailTickets,
				total: new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(newBooking.total),
				support_url: `${req.protocol}://${req.get('host')}/404`,
			};

			await sendBill(req.user?.email, mailData);

			return res.redirect('/ticket/order/success');
		} catch (error) {
			console.log(error);
			res.locals.message = 'Đã có lỗi xảy ra';
			return res.render('ticket/order');
		}
	}
}

module.exports = new PayController();
