import Render from './renderWithEvent.js';

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
		this.state = {
			date: moment().format('YYYYMMDD'),
			theaterId: null,
			cinemaId: null,
			movie: null,
		};
	}

	init = async () => {
		await this.getAllTheaters();
		await this.getCinemasByTheater(this.state.theaterId);
	};

	// Ajax request
	getAllTheaters = async () => {
		try {
			let response = await axios.get('/theaters');
			if (response.success) {
				Render(this.state).renderTheatersList(response.theaters);
				this.state = {
					...this.state,
					theaterId: response.theaters[0]?.id || null,
				};
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
				Render(this.state).renderCinemaList(response.cinemas);
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export default new Api();
