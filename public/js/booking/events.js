import Api from './api.js';
import Session from './session.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default async function Events() {
	const session = Session();

	// Date picker
	const datePicker = () => {
		$$('.time__box:not(.no__showtime)')?.forEach((element) => {
			element.onclick =
				('click',
				(e) => {
					// remove current active
					$('.date--active')?.classList.remove('date--active');
					// add active to selected date
					element
						.querySelector('.time__box--date')
						?.classList.add('date--active');
				});
		});
	};

	// Theater picker
	const theaterPicker = () => {
		$$('.theater__item')?.forEach((element) => {
			element.onclick = async (e) => {
				// remove current active
				$('.theater__item--active')?.classList.remove('theater__item--active');
				// add active to selected theater
				element?.classList.add('theater__item--active');

				let theaterId = element.dataset?.id;
				if (theaterId !== undefined) {
					let state = session.getSession();

					let newState = {
						...state,
						theaterId: +theaterId,
					};

					session.setSession(newState);

					// get new cinemas by theater id
					await Api.getShowtime();
				}
			};
		});
	};

	// Cinema picker
	const cinemaPicker = () => {
		$$('.cinema__box:not(.cinema__box--disable)')?.forEach((element) => {
			element.onclick = async (e) => {
				if (element.classList.contains('cinema__box--active')) {
					element?.classList.remove('cinema__box--active');
					let state = session.getSession();

					let newState = {
						...state,
						cinemaId: null,
						cinemaName: null,
					};

					session.setSession(newState);
				} else {
					// remove current active
					$('.cinema__box--active')?.classList.remove('cinema__box--active');
					// add active to selected theater
					element?.classList.add('cinema__box--active');

					let cinemaId = element.dataset?.id;
					let cinemaName = element.dataset?.alt;
					if (cinemaId !== undefined) {
						session.getAndModify('cinemaId', +cinemaId);
						session.getAndModify('cinemaName', cinemaName);

						// get available movies by cinemaId
					}
				}
				await Api.getShowtime();
			};
		});
	};

	// Movie picker
	const moviePicker = () => {
		$$('.movie__item')?.forEach((element) => {
			element.onclick = async (e) => {
				if (element.classList.contains('movie__item--active')) {
					element?.classList.remove('movie__item--active');
					let state = session.getSession();

					let newState = {
						...state,
						movieId: null,
						movieName: null,
					};

					session.setSession(newState);
				} else {
					// remove current active
					$('.movie__item--active')?.classList.remove('movie__item--active');
					// add active to selected theater
					element?.classList.add('movie__item--active');

					let movieId = element.dataset?.id;
					let movieName = element.dataset?.alt;
					if (movieId !== undefined) {
						session.getAndModify('movieId', +movieId);
						session.getAndModify('movieName', movieName);

						// get available cinemas by movieId
					}
				}

				await Api.getShowtime();
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
