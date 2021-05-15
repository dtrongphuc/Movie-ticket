const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const bookingMiddleware = require('../middlewares/booking/booking.middleware');

router.get(
	'/book',
	bookingMiddleware.dateQuery,
	ticketController.getBookingByDate
);

module.exports = router;
