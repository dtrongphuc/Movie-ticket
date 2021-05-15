const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Axios config
axios.defaults.baseURL = `${location.origin}/api`;
// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

class Api {
	constructor() {
		this.state = {
			date: moment().format('YYYYMMDD'),
			theaterId: '',
			cinemaId: '',
			movie: '',
		};

		if (typeof Storage !== 'undefined') {
			this.setSession();
		}
	}

	init = async () => {
		await this.getAllTheaters();
		await this.getCinemasByTheater(this.state.theaterId);
		await this.events();
	};

	setSession = () => {
		//set sesionStorage
		sessionStorage.setItem('bookingState', JSON.stringify(this.state));
	};

	events = () => {
		//Set theater when trigger click
		$$('.theater__item')?.forEach((element) => {
			element.addEventListener('click', async (e) => {
				let theaterId = element.dataset?.id;
				if (theaterId !== undefined && theaterId !== this.state.theaterId) {
					this.state = {
						...this.state,
						theaterId: theaterId,
					};
					this.setSession();
					// get new cinemas by theater id
					await this.getCinemasByTheater(theaterId);
				}
			});
		});

		$$('.cinema__box:not(.cinema__box--disable)')?.forEach((element) => {
			element.addEventListener('click', (e) => {
				let cinemaId = element.dataset?.id;
				if (cinemaId !== undefined && cinemaId !== this.state.cinemaId) {
					this.state = {
						...this.state,
						cinemaId: cinemaId,
					};
					this.setSession();
					// get new cinemas by theater id
					// await this.getCinemasByTheater(theaterId);
				}
			});
		});
	};

	// Render
	renderTheatersList = (theaters) => {
		let htmlText = theaters?.map(
			(theater, index) => `<li class="theater__item ${
				index === 0 ? 'theater__item--active' : ''
			}" data-id="${theater.id}">
      <a href="javascript:void(0)">${theater.name}</a>
    </li>`
		);
		$('.theater__list').innerHTML = htmlText.join('');
	};

	renderCinemaList = (cinemas) => {
		let htmlText = cinemas?.map(
			(cinema) => `<div class="col-4" style="padding: 0 3px">
      <a href="javascript:void(0)">
        <div class="cinema__box ${
					cinema.id === this.state.cinemaId ? 'cinema__box--active' : ''
				}" data-id="${cinema.id}">
          <div class="cinema__box--item">${cinema.name}</div>
        </div>
      </a>
    </div>`
		);
		$('.cinema__inner').innerHTML = htmlText.join('');
	};

	// Ajax request
	getAllTheaters = async () => {
		try {
			let response = await axios.get('/theaters');
			if (response.success) {
				this.renderTheatersList(response.theaters);
				this.state = {
					...this.state,
					theaterId: response.theaters[0]?.id || '',
				};

				this.setSession();
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
				this.renderCinemaList(response.cinemas);
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export default new Api();
