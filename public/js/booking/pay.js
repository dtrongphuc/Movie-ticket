
import Ticket from './chooseseat';

this.ticket = Ticket;

$(document).ready(function() {

    const session = this.ticket.renderTiket();
    // console.log(session.ticketImg);
    // console.log(session.ticketName);
    // console.log(session.ticketTimeDate);
    // console.log(session.ticketTime);
    // console.log(session.ticketcinemaName);
    // console.log(session.ticketCount);
    document.querySelector("#order-movie-date").innerHTML =  session.ticketImg  + session.ticketName + session.ticketTimeDate + session.ticketTime;

});

const session = this.ticket.setBooking();
document.querySelector('#order-movie-img').src = session.ticketImg;
document.querySelector('#order-movie-name').innerHTML = session.ticketName;
document.querySelector('#order-movie-date').innerHTML = session.ticketTimeDate;
document.querySelector('#order-movie-time').innerHTML = session.ticketTime;
document.querySelector('#order-movie-cinema').innerHTML = session.ticketcinemaName;
document.querySelector('#order-movie-cinema').innerHTML = session.ticketCount;