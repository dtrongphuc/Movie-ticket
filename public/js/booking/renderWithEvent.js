import Events from './events.js';
import Session from './session.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default function Render() {
	const session = Session();

	// Render
	const renderTheatersList = (theaters) => {
		let htmlText = theaters?.map(
			(theater) => `<li class="theater__item ${
				session.getSession().theaterId === theater.id
					? 'theater__item--active'
					: ''
			}" data-id="${theater.id}">
      <a href="javascript:void(0)">${theater.name} (${theater.count})</a>
    </li>`
		);
		$('.theater__list').innerHTML = htmlText.join('');
		Events();
	};

	const renderCinemaList = (cinemas) => {
		let htmlText = cinemas?.map(
			(cinema) => `<div class="col-4" style="padding: 0 3px">
      <a href="javascript:void(0)">
        <div class="cinema__box${
					cinema.id === session.getSession().cinemaId
						? ' cinema__box--active'
						: cinema.active === false
						? ' cinema__box--disable'
						: ''
				}" data-id="${cinema.id}" data-alt="${cinema.name}">
          <div class="cinema__box--item">${cinema.name}</div>
        </div>
      </a>
    </div>`
		);
		$('.cinema__inner').innerHTML = htmlText.join('');
		Events();
	};

	const renderShowtimeMovies = (movies) => {
		let htmlText = movies?.map(
			(movie) => `<li class="movie__item${
				session.getSession().movieId === movie.id ? ' movie__item--active' : ''
			}${!movie.active ? ' movie__item--disable' : ''}" data-id="${
				movie.id
			}" data-alt="${movie.name}">
			<a
				href="javascript:void(0)"
				class="d-flex align-items-center"
			>
				<div class="movie__item-img"></div>
				<span>${movie.name}</span>
			</a>
		</li>`
		);
		$('.movie__body > ul').innerHTML = htmlText.join('');
		Events();
	};

	const renderShowtimeCinema = (showtimes) => {
		$('.showtime__Data')?.classList.remove('d-none');
		$('.showtime__noData')?.classList.add('d-none');

		$('#cinema-selected').innerHTML =
			session.getSession().cinemaName || 'Vui lòng chọn phòng chiếu';
		$('#movie-selected').innerHTML =
			session.getSession().movieName || 'Vui lòng chọn phim';
		$('.showtime__movie--title > span').innerHTML =
			session.getSession().movieName || '';
		$('.showtime__cinema--title').innerHTML =
			session.getSession().cinemaName || '';

		let htmlText = showtimes?.map(
			(showtime) => `<div class="col-2">
			<div class="showtime__theater--type">Loại ghế:${showtime.cinema.type}</div>
			<div class="showtime__box" data-id="${showtime.id}">
				<a href="/ticket/bookseat?cinemaId=${session.getSession().cinemaId}&movieId=${
				session.getSession().movieId
			}">
					<div class="showtime__box--screen">Screen</div>
					<!-- startShow: thời gian bắt đầu phim -->
					<div class="showtime__box--time startShow">${showtime.time}</div>
					<!-- startToendtime: cộng thêm thời lượng phim -->
					<div class="showtime__box--time startToendtime">
						${showtime.duringTime}
					</div>
					<div class="showtime__box--seat">
						${showtime.cinema.booked} / ${showtime.cinema.seat} Ghế ngồi
					</div>
				</a>
			</div>
		</div>`
		);

		$('.showtime__list > .row').innerHTML = htmlText.join('');
		Events();
	};

	const renderEmptyData = () => {
		$('.showtime__Data')?.classList.add('d-none');
		$('.showtime__noData')?.classList.remove('d-none');
		$('#cinema-selected').innerHTML =
			session.getSession().cinemaName || 'Vui lòng chọn phòng chiếu';
		$('#movie-selected').innerHTML =
			session.getSession().movieName || 'Vui lòng chọn phim';
		$('.showtime__movie--title > span').innerHTML =
			session.getSession().movieName || '';
		$('.showtime__cinema--title').innerHTML =
			session.getSession().cinemaName || '';
	};

	return {
		renderTheatersList,
		renderCinemaList,
		renderShowtimeMovies,
		renderShowtimeCinema,
		renderEmptyData,
	};
}
