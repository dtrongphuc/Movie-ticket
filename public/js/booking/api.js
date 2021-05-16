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
		await this.getAllTheaters();
		await Promise.all([
			this.getCinemasByTheater(this.session.getSession().theaterId),
			this.getAllShowtimeMovies(),
		]);
	};

	// Ajax request
	getAllTheaters = async () => {
		try {
			let response = await axios.get('/theaters');
			if (response.success) {
				Render().renderTheatersList(response.theaters);
				this.session.getAndModify(
					'theaterId',
					response.theaters[0]?.id || null
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	getCinemasByTheater = async (theaterId) => {
		try {
			let response = await axios.get(`/cinemas`, {
				params: {
					theaterId: theaterId,
				},
			});
			if (response.success) {
				Render().renderCinemaList(response.cinemas);
			}
		} catch (error) {
			console.log(error);
		}
	};

	getAllShowtimeMovies = async () => {
		try {
			let response = await axios.get(`/showtime-movies`);
			if (response.success) {
				Render().renderShowtimeMovies(response.movies);
			}
		} catch (error) {
			console.log(error);
		}
	};

	getMoviesByCinema = async () => {
		try {
			let { date, cinemaId } = this.session.getSession();
			let response = await axios.get(`/movies`, {
				params: {
					date: date,
					cinema: cinemaId,
				},
			});
			if (response.success) {
				Render().renderShowtimeMovies(response.movies);
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export default new Api();
