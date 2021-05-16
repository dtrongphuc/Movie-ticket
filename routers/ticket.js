const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const bookingMiddleware = require('../middlewares/booking/booking.middleware');

router.get(
	'/book',
	bookingMiddleware.dateQuery,
	bookingMiddleware.getTheaters,
	ticketController.getBooking
);
router.get('/bookseat', ticketController.bookseat);
router.get('/order', ticketController.order);

module.exports = router;
