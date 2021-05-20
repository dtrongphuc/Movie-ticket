
function onLoaderFunc()
{
  $(".seatStructure *").prop("disabled", true);
}


function takeData()
{
  if (( $("#Numseats").val() == 0 ))
  {
    alert("Vui lòng chọn số lượng ghế");
  }
  else
  {
    $(".seatStructure *").prop("disabled", false);
    document.getElementById("notification").innerHTML = "<b style='margin-bottom:0px;background:yellow;'>Vui lòng chọn ghế!</b>";
  }
}

function updateTextArea() { 
    
  if ($("input:checked").length == ($("#Numseats").val()))
    {
      $(".seatStructure *").prop("disabled", true);
      
     var allSeatsVals = [];
  
     $('#seatsBlock :checked').each(function() {
       allSeatsVals.push($(this).val());
     });

     $('#seatsDisplay').val(allSeatsVals);

    }
  else
    {
      alert("Please select " + ($("#Numseats").val()) + " seats")
    }
  }


function myFunction() {
  alert($("input:checked").length);
}



$(":checkbox").click(function() {
  if ($("input:checked").length == ($("#Numseats").val())) {
    $(":checkbox").prop('disabled', true);
    $(':checked').prop('disabled', false);
  }
  else
    {
      $(":checkbox").prop('disabled', false);
    }
});

