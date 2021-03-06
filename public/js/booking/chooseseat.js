
const init = function (e) {
	var spn2 = document.querySelector('#order-movie-price');
	var spn3 = document.querySelector('#order-movie-seat');
	var spn4 = document.querySelector('#order-movie-total');

	spn2.innerHTML = sessionStorage.getItem('totalPay');
	spn4.innerHTML = sessionStorage.getItem('totalPay');
	spn3.innerHTML = JSON.parse(sessionStorage.getItem('numberSeat'));

	document.querySelector('#ordernumberSeat').value = JSON.parse(sessionStorage.getItem('numberSeat'));

	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get('e');
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

function checkValue(){

	var Checkbox = document.getElementById('cb_rule');
	var isChecked = Checkbox.checked;
	var CheckboxWallet = document.getElementById('wallet');
	var isCheckedWallet = CheckboxWallet.checked;
	var CheckboxVisa = document.getElementById('visa');
	var isCheckedVisa = CheckboxVisa.checked;
	var CheckboxAtm = document.getElementById('ATM');
	var isCheckedAtm = CheckboxAtm.checked;

	if((isCheckedWallet == true && isCheckedVisa == false && isCheckedAtm == false)||
		(isCheckedWallet == false && isCheckedVisa == true && isCheckedAtm == false) ||
		(isCheckedWallet == false && isCheckedVisa == false && isCheckedAtm == true) ){
			if(isChecked == false){
				alert("Bạn vui lòng chấp nhận điều kiện và điều khoản của chúng tôi!");
				return false;
			}else{
				var conf = confirm(' Bạn thật sự muốn booking! ');
				if(conf == true){
					return true
				}
			}
	}else{
		alert("Bạn vui lòng chọn phương thức thanh toán!");
		return false;
	}
	return false;
}
