const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Booking {
	// Date picker
	datePicker = () => {
		$$('.time__box:not(.no__showtime)')?.forEach((element) => {
			element.addEventListener('click', (e) => {
				// remove current active
				$('.date--active').classList.remove('date--active');
				// add active to selected date
				element.querySelector('.time__box--date').classList.add('date--active');
			});
		});
	};

	// Theater picker
	theaterPicker = () => {
		$$('.theater__item')?.forEach((element) => {
			element.addEventListener('click', (e) => {
				console.log('click');
				// remove current active
				$('.theater__item--active').classList.remove('theater__item--active');
				// add active to selected theater
				element.classList.add('theater__item--active');
			});
		});
	};

	// Movie picker
	moviePicker = () => {
		$$('.movie__item')?.forEach((element) => {
			element.addEventListener('click', (e) => {
				// remove current active
				$('.movie__item--active').classList.remove('movie__item--active');
				// add active to selected theater
				element.classList.add('movie__item--active');
			});
		});
	};

	// Cinema picker
	cinemaPicker = () => {
		$$('.cinema__box:not(.cinema__box--disable)')?.forEach((element) => {
			element.addEventListener('click', (e) => {
				// remove current active
				$('.cinema__box--active')?.classList.remove('cinema__box--active');
				// add active to selected theater
				element.classList.add('cinema__box--active');
			});
		});
	};
}

export default new Booking();
