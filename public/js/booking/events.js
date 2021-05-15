import Api from './api.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default function Events(state) {
	// Date picker
	const datePicker = () => {
		$$('.time__box:not(.no__showtime)')?.forEach((element) => {
			element.onclick =
				('click',
				(e) => {
					// remove current active
					$('.date--active').classList.remove('date--active');
					// add active to selected date
					element
						.querySelector('.time__box--date')
						.classList.add('date--active');
				});
		});
	};

	// Theater picker
	const theaterPicker = () => {
		$$('.theater__item')?.forEach((element) => {
			element.onclick = async (e) => {
				// remove current active
				$('.theater__item--active').classList.remove('theater__item--active');
				// add active to selected theater
				element.classList.add('theater__item--active');

				let theaterId = element.dataset?.id;
				if (theaterId !== undefined) {
					state = {
						...state,
						theaterId: +theaterId,
						cinemaId: null,
					};

					// get new cinemas by theater id
					await Api.getCinemasByTheater(theaterId);
				}
			};
		});
	};

	// Movie picker
	const moviePicker = () => {
		$$('.movie__item')?.forEach((element) => {
			element.onclick = (e) => {
				// remove current active
				$('.movie__item--active').classList.remove('movie__item--active');
				// add active to selected theater
				element.classList.add('movie__item--active');
			};
		});
	};

	// Cinema picker
	const cinemaPicker = () => {
		$$('.cinema__box:not(.cinema__box--disable)')?.forEach((element) => {
			element.onclick = (e) => {
				// remove current active
				$('.cinema__box--active')?.classList.remove('cinema__box--active');
				// add active to selected theater
				element.classList.add('cinema__box--active');

				let cinemaId = element.dataset?.id;
				if (cinemaId !== undefined) {
					state = {
						...state,
						cinemaId: +cinemaId,
					};

					console.log(state);
					// get new cinemas by theater id
					// await this.getCinemasByTheater(theaterId);
				}
			};
		});
	};

	return (function () {
		datePicker();
		theaterPicker();
		moviePicker();
		cinemaPicker();
	})();
}