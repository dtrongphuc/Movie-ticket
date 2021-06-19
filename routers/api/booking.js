const express = require('express');
const router = express.Router();
const bookingController = require('../../api/booking.api');

router.get('/showtime', bookingController.getWithQuery);
router.get('/showtime/during-time', bookingController.getDuringTime);
router.get('/showtime/fare', bookingController.getFare);
router.get('/date/string', bookingController.getDateString);
router.get('/movie', bookingController.getMovieInfo);
router.get(
	'/showtime/available-date',
	bookingController.getFirstAvailableShowtime
);

module.exports = router;
