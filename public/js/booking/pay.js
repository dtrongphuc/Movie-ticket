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
			this.renderOrder();
		});
	}

	async init() {
		if (!this.session.getSession().showtimeId) {
			window.location.href = '/404';
			return;
		}

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

	async renderOrder() {
		const session = this.session.getSession();

		document.querySelector('#order-movie-img').src =
			this.state.movie?.posterUrl;
		document.querySelector('#order-movie-name').innerHTML =
			this.state.movie?.name;
		document.querySelector('#order-movie-date').innerHTML =
			this.state.dateString;
		document.querySelector('#order-movie-time').innerHTML =
			this.state.duringTime;

		document.querySelector('#order-movie-cinema').innerHTML =
			session.cinemaName;

		document.querySelector('#ordershowtimeId').value =
			this.session.getSession()?.showtimeId;
	}
}

export default new Bookseat();
