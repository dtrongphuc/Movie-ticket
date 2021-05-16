import Events from './events.js';
import Session from './session.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default function Render() {
	const session = Session();

	// Render
	const renderTheatersList = (theaters) => {
		let htmlText = theaters?.map(
			(theater, index) => `<li class="theater__item ${
				index === 0 ? 'theater__item--active' : ''
			}" data-id="${theater.id}">
      <a href="javascript:void(0)">${theater.name}</a>
    </li>`
		);
		$('.theater__list').innerHTML = htmlText.join('');
		Events();
	};

	const renderCinemaList = (cinemas) => {
		let htmlText = cinemas?.map(
			(cinema) => `<div class="col-4" style="padding: 0 3px">
      <a href="javascript:void(0)">
        <div class="cinema__box ${
					cinema.id === session.getSession().cinemaId
						? 'cinema__box--active'
						: ''
				}" data-id="${cinema.id}">
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
			(movie) => `<li class="movie__item ${
				session.getSession().movieId === movie.id ? 'movie__item--active' : ''
			} ${!movie.active ? 'movie__item--disable' : ''}" data-id="${movie.id}">
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

	return {
		renderTheatersList,
		renderCinemaList,
		renderShowtimeMovies,
	};
}
