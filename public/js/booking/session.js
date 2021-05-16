const SESSION_NAME = 'bookingState';

export default function Session() {
	return {
		init() {
			const initialState = {
				date: moment().format('YYYYMMDD'),
				theaterId: null,
				cinemaId: null,
				movie: null,
			};

			sessionStorage.setItem(SESSION_NAME, JSON.stringify(initialState));
		},

		getSession() {
			return JSON.parse(sessionStorage.getItem(SESSION_NAME));
		},

		setSession(state) {
			sessionStorage.setItem(SESSION_NAME, JSON.stringify(state));
		},

		getAndModify(attr, value) {
			let state = this.getSession();
			let newState = {
				...state,
				[attr]: value,
			};

			this.setSession(newState);
		},
	};
}
