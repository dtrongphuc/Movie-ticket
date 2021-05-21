import Render from './renderWithEvent.js';
import Session from './session.js';

// Axios config
axios.defaults.baseURL = `${location.origin}/api`;
// Add a response interceptor
axios.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);
class Api {
	constructor() {
		this.session = Session();
	}

	init = async () => {
		await this.initDate();
		await this.getShowtime();
	};

	initDate = async () => {
		try {
			let response = await axios.get('/showtime/available-date');
			if (response.success) {
				this.session.getAndModify('date', response.initDate);
			}
		} catch (error) {
			console.log(error);
		}
	};

	getShowtime = async () => {
		try {
			let state = this.session.getSession();
			let response = await axios.get('/showtime', {
				params: {
					date: state.date,
					theaterId: state.theaterId,
					cinemaId: state.cinemaId,
					movieId: state.movieId,
				},
			});
			if (response.success) {
				this.session.getAndModify(
					'theaterId',
					state.theaterId || response.theaters[0]?.id
				);

				Render().renderTheatersList(response.theaters);
				let theater = response.theaters.find(
					(theater) =>
						theater.id.toString() ===
						this.session.getSession().theaterId.toString()
				);
				Render().renderCinemaList(theater.cinemas);
				Render().renderShowtimeMovies(response.movies);

				if (response.hasOwnProperty('show')) {
					Render().renderShowtimeCinema(response.show);
				} else {
					Render().renderEmptyData();
				}
			} else {
				Render().renderEmptyData();
			}
		} catch (error) {
			console.log(error);
			Render().renderEmptyData();
		}
	};

	getDuringTime = async (id) => {
		try {
			let response = await axios.get('/showtime/during-time', {
				params: {
					id,
				},
			});

			return response.duringTime;
		} catch (error) {
			console.log(error);
		}
	};

	getDateString = async (date) => {
		try {
			const response = await axios.get('/date/string', {
				params: {
					date,
				},
			});

			return response.dateString;
		} catch (error) {
			console.log(error);
		}
	};

	getMovie = async (id) => {
		try {
			const response = await axios.get('/movie', {
				params: {
					id,
				},
			});

			return response.movie;
		} catch (error) {
			console.log(error);
		}
	};
}

export default new Api();
