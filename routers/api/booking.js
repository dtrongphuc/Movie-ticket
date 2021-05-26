const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/api/booking.controller');

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
