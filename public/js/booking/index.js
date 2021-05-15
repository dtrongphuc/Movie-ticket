import Booking from './function.js';
import Api from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
	//API
	await Api.init();

	//Select
	Booking.datePicker();
	Booking.theaterPicker();
	Booking.moviePicker();
	Booking.cinemaPicker();
});
