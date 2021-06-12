const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const bookingMiddleware = require('../middlewares/booking/booking.middleware');
const booking = require('../controllers/pay.controller');
const auth = require('../controllers/auth.controller');

router.get(
	'/book',
	bookingMiddleware.dateQuery,
	bookingMiddleware.getTheaters,
	ticketController.getBooking
);
router.get('/bookseat', ticketController.bookseat);
router.get('/order', ticketController.order);
router.post('/order', booking.addBooking);

router.get('/order/success', (req, res) => {
	res.render('ticket/success');
});

module.exports = router;
