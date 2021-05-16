const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/api/booking.controller');

router.get('/theaters', bookingController.getAllTheaters);
router.get('/cinemas', bookingController.getCinemasByTheaterId);
router.get('/showtime-movies', bookingController.getShowtimeMovies);
router.get('/movies', bookingController.getMoviesByDateAndCinema);

module.exports = router;
