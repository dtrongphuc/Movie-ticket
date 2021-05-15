import Booking from './function.js';

document.addEventListener('DOMContentLoaded', () => {
	//Select
	Booking.datePicker();
	Booking.theaterPicker();
	Booking.moviePicker();
	Booking.cinemaPicker();

	//Binding
	Booking.innerSelectedDate();
});
