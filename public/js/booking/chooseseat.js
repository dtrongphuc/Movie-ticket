
import Session from './session.js';
import Api from './api.js';

class booking {

	constructor() {
		this.session = Session();
		this.state = {
			duringTime: '',
			dateString: '',
			movie: {},
		};

		this.init().then(() => {
			this.renderTiket();
		});
	}

	async init() {
		[this.state.duringTime, this.state.dateString, this.state.movie] =
			await Promise.all([
				Api.getDuringTime(this.session.getSession().showtimeId),
				Api.getDateString(this.session.getSession().date),
				Api.getMovie(this.session.getSession().movieId),
			]);
	}
	
	// async renderTiket() {
	// 	const session = this.session.getSession();
    //     return  [
    //     { 
    //         ticketTimedate: this.state.duringTime, 
    //         ticketTime : session.date,
    //         ticketCinemaName: session.cinameName,
    //         //ticketUserId: session.
    //         ticketName: this.state.movie?.name, 
    //         ticketImg: this.state.movie?.posterUrl, 
    //         ticketshowtimeId: session.showtimeId, 
    //         ticketCount: $("#Numseats").val(),
    //         ticketSeat: {number}
    //     },
    //     ];
	// }

    async renderTiket() {

		const session = this.session.getSession();
		document.querySelector('#order-movie-img').src =
			this.state.movie?.posterUrl;
		document.querySelector('#order-movie-name').innerHTML =
			this.state.movie?.name;
		document.querySelector('#order-movie-date').innerHTML = this.state.dateString;
		document.querySelector('#order-movie-time').innerHTML =
			this.state.duringTime;
		document.querySelector('#ticket-cinema').innerHTML = session.cinemaName;
	}
}

export default new booking();