const init = function(e) {

    var spn2 = document.querySelector('#order-movie-price');
    var spn3 = document.querySelector('#order-movie-seat');
    var spn4 = document.querySelector('#order-movie-total');

    spn2.innerHTML = sessionStorage.getItem('totalPay');
    spn3.innerHTML = JSON.parse(sessionStorage.getItem('numberSeat'));
    spn4.innerHTML = sessionStorage.getItem('totalPay');
   
    document.querySelector("#orderseat").value = sessionStorage.getItem('lenghtSeat');
    document.querySelector("#ordernumberSeat").value = JSON.parse(sessionStorage.getItem('numberSeat'));

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('e');
    if(myParam != null){
        if(myParam == "Incorrect"){
            alert("Xác nhận thành công");
        }else{
            alert("Xác nhận không thành công");
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
    init();
});

function removSession(){

    var conf = confirm(" Bạn muốn booking! ");

}
