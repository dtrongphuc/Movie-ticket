const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/api/booking.controller');

router.get('/showtime', bookingController.getWithQuery);
router.get(
	'/showtime/available-date',
	bookingController.getFirstAvailableShowtime
);

module.exports = router;
