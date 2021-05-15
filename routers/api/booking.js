const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/api/booking.controller');

router.get('/theaters', bookingController.getAllTheaters);
router.get('/cinemas', bookingController.getCinemasByTheaterId);

module.exports = router;
