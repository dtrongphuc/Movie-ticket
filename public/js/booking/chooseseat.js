
const init = function(e) {

    var spn1 = document.querySelector('#order-movie-count'); 
    var spn2 = document.querySelector('#order-movie-price');
    var spn3 = document.querySelector('#order-movie-seat');
    var spn4 = document.querySelector('#order-movie-total');
    spn2.innerHTML = new Intl.NumberFormat().format(sessionStorage.getItem('totalPay'));
    spn4.innerHTML = new Intl.NumberFormat().format(sessionStorage.getItem('totalPay'));
    spn3.innerHTML = sessionStorage.getItem('numberSeat');
    spn1.innerHTML = JSON.parse(sessionStorage.getItem('lenghtSeat').length);

    document.querySelector("#order-total").value = sessionStorage.getItem('totalPay');
    document.querySelector("#order-seat").value = sessionStorage.getItem('lenghtSeat');

    //const storedArray = sessionStorage.getItem('bookingState').showtimeId.value;//no brackets

    // for(var i = 0 ; i < storedArray.length ; i++ ){
    //     console.log(storedArray[i]);
        //document.querySelector("#order-showtimeId").value = storedArray;
    //}
};

document.addEventListener('DOMContentLoaded', function(){
    init();
});


function removSession(){
    sessionStorage.removeItem("totalPay");
    sessionStorage.removeItem("numberSeat");
    sessionStorage.removeItem("lenghtSeat");
}
