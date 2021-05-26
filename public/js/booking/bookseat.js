import Session from './session.js';
import Api from './api.js';
class Bookseat {
	constructor() {
		this.session = Session();
		this.state = {
			duringTime: '',
			dateString: '',
			movie: {},
			fare: '',
		};

		this.init().then(() => {
			this.renderTiket();
		});
	}

	async init() {
		[
			this.state.duringTime,
			this.state.dateString,
			this.state.movie,
			this.state.fare,
		] = await Promise.all([
			Api.getDuringTime(this.session.getSession().showtimeId),
			Api.getDateString(this.session.getSession().date),
			Api.getMovie(this.session.getSession().movieId),
			Api.getFare(this.session.getSession().showtimeId),
		]);
	}

	async renderTiket() {
		const session = this.session.getSession();
		document.querySelector('#ticket-movie-poster').src =
			this.state.movie?.posterUrl;
		document.querySelector('#ticket-movie-name').innerHTML =
			this.state.movie?.name;
		document.querySelector('#ticket-date').innerHTML = this.state.dateString;
		document.querySelector('#ticket-during-time').innerHTML =
			this.state.duringTime;
		document.querySelector('#ticket-cinema').innerHTML = session.cinemaName;

		document.querySelector('#ticket-movie-money1').innerHTML = this.state.fare;
	}

}

export default new Bookseat();
