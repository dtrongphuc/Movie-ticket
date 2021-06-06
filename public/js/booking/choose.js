
var seatChoose = [];
var allSeatsVals = [];
function onLoaderFunc() {
  $(".seatStructure *").prop("disabled", true);


  var oTable = document.getElementById('noChooseSeat');
    var rowLength = oTable.rows.length;

    for (i = 0; i < rowLength; i++){
       var oCells = oTable.rows.item(i).cells;
       var cellLength = oCells.length;
       for(var j = 0; j < cellLength; j++){
              var cellVal = oCells.item(j).innerHTML;
              seatChoose.push(cellVal);
           }
    }

  $('#seatsBlock tr').each(function(){
    $(this).find('td').each(function(){
      var seat = $(this).find('input[type=checkbox]').val();
      for(var i = 0; i < seatChoose.length; i++){
        if(seatChoose[i] == seat){
          $(this).find('input[type=checkbox]').removeClass("seats");
          $(this).find('input[type=checkbox]').addClass("chooseSeat");
        }
      }
    })
  })

}

function takeData() {
  if (($("#Numseats").val() == 0)) {
    alert("Vui lòng chọn số lượng ghế");
  }
  else {
    $(".seatStructure *").prop("disabled", false);
    document.getElementById("notification").innerHTML = "<b style='margin-bottom:0px;background:yellow;'>Vui lòng chọn ghế!</b>";
  }
}

function updateTextArea() {

  if ($("input:checked").length == ($("#Numseats").val())) {
    $(".seatStructure *").prop("disabled", true);


    $('#seatsBlock :checked').each(function () {
      allSeatsVals.push($(this).val());
    });

    $('#seatsDisplay').val(allSeatsVals);

    const money = ($("#Numseats").val()) * ($('#ticket-movie-money1').text());

    var currencyFormatter = new Intl.NumberFormat().format(money);
    document.querySelector("#ticket-movie-money2").innerHTML = money;
    document.querySelector("#ticket-movie-money3").innerHTML = currencyFormatter;

  }
  else {
    alert("Please select " + ($("#Numseats").val()) + " seats")
  }
}

function myFunction() {
  alert($("input:checked").length);
}

$(":checkbox").click(function () {
  if ($("input:checked").length == ($("#Numseats").val())) {
    $(":checkbox").prop('disabled', true);
    $(':checked').prop('disabled', false);
  }
  else {
    $(":checkbox").prop('disabled', false);
  }
});


function getData(){
  
    const totalpay = $("#ticket-movie-money2").text();
    const mumberSeats = allSeatsVals;
    const length = JSON.stringify(allSeatsVals);
    sessionStorage.setItem('totalPay', totalpay);
    sessionStorage.setItem('numberSeat', JSON.stringify(mumberSeats));
    sessionStorage.setItem('lenghtSeat', length);
    window.document.location = '/views/ticket/order.ejs';

}



