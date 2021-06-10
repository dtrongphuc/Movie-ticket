const init = function (e) {
	var spn1 = document.querySelector('#order-movie-count');
	var spn2 = document.querySelector('#order-movie-price');
	var spn3 = document.querySelector('#order-movie-seat');
	var spn4 = document.querySelector('#order-movie-total');
	spn2.innerHTML = sessionStorage.getItem('totalPay');
	spn4.innerHTML = sessionStorage.getItem('totalPay');
	spn3.innerHTML = sessionStorage.getItem('numberSeat');
	spn1.innerHTML = JSON.parse(sessionStorage.getItem('lenghtSeat').length);

	document.querySelector('#orderseat').value =
		sessionStorage.getItem('lenghtSeat');
	document.querySelector('#ordernumberSeat').value = JSON.parse(
		sessionStorage.getItem('numberSeat')
	);
};

document.addEventListener('DOMContentLoaded', function () {
	init();
});

function removSession() {
	var conf = confirm('Bạn muốn booking! ');
	if (conf == true) {
		sessionStorage.removeItem('numberSeat');
		sessionStorage.removeItem('lenghtSeat');
	}
}
