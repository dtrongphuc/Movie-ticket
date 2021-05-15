import Events from './events.js';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default function Render(state) {
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
		Events(state);
	};

	const renderCinemaList = (cinemas) => {
		let htmlText = cinemas?.map(
			(cinema) => `<div class="col-4" style="padding: 0 3px">
      <a href="javascript:void(0)">
        <div class="cinema__box ${
					cinema.id === state.cinemaId ? 'cinema__box--active' : ''
				}" data-id="${cinema.id}">
          <div class="cinema__box--item">${cinema.name}</div>
        </div>
      </a>
    </div>`
		);
		$('.cinema__inner').innerHTML = htmlText.join('');
		Events(state);
	};

	return {
		renderTheatersList,
		renderCinemaList,
	};
}
