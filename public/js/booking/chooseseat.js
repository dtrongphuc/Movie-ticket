const init = function (e) {
	var spn2 = document.querySelector('#order-movie-price');
	var spn3 = document.querySelector('#order-movie-seat');
	var spn4 = document.querySelector('#order-movie-total');
	spn2.innerHTML = sessionStorage.getItem('totalPay');
	spn4.innerHTML = sessionStorage.getItem('totalPay');
	spn3.innerHTML = sessionStorage.getItem('numberSeat');

	document.querySelector('#ordernumberSeat').value = JSON.parse(
		sessionStorage.getItem('numberSeat')
	);
	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get('error');
	if (myParam != null) {
		if (myParam == 'Incorrect') {
			alert('Xác nhận thành công');
		} else {
			alert('Xác nhận không thành công');
		}
	}
};

document.addEventListener('DOMContentLoaded', function () {
	init();
});

function removSession() {
	var conf = confirm(' Bạn muốn booking! ');
	// if(conf == true){
	//     sessionStorage.removeItem("totalPay");
	//     sessionStorage.removeItem("numberSeat");
	//     sessionStorage.removeItem("lenghtSeat");
	// }
}
