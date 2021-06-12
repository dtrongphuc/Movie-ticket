var seatChoose = [];
var allSeatsVals = [];

function onLoaderFunc() {
	$('.seatStructure *').prop('disabled', true);

	var oTable = document.getElementById('noChooseSeat');
	var rowLength = oTable.rows.length;
	for (i = 0; i < rowLength; i++) {
		var oCells = oTable.rows.item(i).cells;
		var cellLength = oCells.length;
		for (var j = 0; j < cellLength; j++) {
			var cellVal = oCells.item(j).innerHTML;
			seatChoose.push(cellVal);
		}
	}

	$('#seatsBlock tr').each(function () {
		$(this)
			.find('td')
			.each(function () {
				var seat = $(this).find('input[type=checkbox]').val();
				for (var i = 0; i < seatChoose.length; i++) {
					if (seatChoose[i] == seat) {
						$(this).find('input[type=checkbox]').removeClass('seats');
						$(this).find('input[type=checkbox]').addClass('chooseSeat');
					}
				}
			});
	});

	$('#nextPage').hide();
}

function takeData() {
	if ($('#Numseats').val() == 0) {
		alert('Vui lòng chọn số lượng ghế');
	} else {
		$('#seatsBlock tr').each(function () {
			$(this)
				.find('td')
				.each(function () {
					$(this).find('input[type=checkbox].seats').prop('disabled', false);
				});
		});
		document.getElementById('notification').innerHTML =
			"<b style='margin-bottom:0px;background:yellow;'>Vui lòng chọn ghế!</b>";
	}
}

function updateTextArea() {
	if ($('input:checked').length == $('#Numseats').val()) {
		$('.seatStructure *').prop('disabled', true);

		$('#seatsBlock :checked').each(function () {
			allSeatsVals.push($(this).val());
		});

		$('#seatsDisplay').val(allSeatsVals);

		const showtimeId = JSON.parse(
			sessionStorage.getItem('bookingState')
		).showtimeId;
		axios
			.get(`${location.origin}/api/showtime/fare?id=${showtimeId}`)
			.then((response) => {
				const { fare } = response;
				const money = $('#Numseats').val() * +fare;

				var currencyFormatter = new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(money);
				document.querySelector('#ticket-movie-money2').innerHTML =
					currencyFormatter;
				document.querySelector('#ticket-movie-money3').innerHTML =
					currencyFormatter;
			})
			.catch((err) => console.log(err));
	} else {
		alert('Please select ' + $('#Numseats').val() + ' seats');
	}
}

function myFunction() {
	alert($('input:checked').length);
}

$(':checkbox').on('click', function () {
	if ($('input:checked').length == $('#Numseats').val()) {
		$(':checkbox').prop('disabled', true);
		$(':checked').prop('disabled', false);
	} else {
		$('#seatsBlock tr').each(function () {
			$(this)
				.find('td')
				.each(function () {
					$(this).find('input[type=checkbox].seats').prop('disabled', false);
				});
		});
		//$(':checkbox').prop('disabled', false);
	}
});

$('#confirmChooseSeat').on('click', function () {
	if ($('#Numseats').val() == 0) {
		alert('Vui lòng chọn số lượng ghế');
	} else {
		if ($('input:checked').length == $('#Numseats').val()) {
			$('#nextPage').show();
		}
	}
});

function getData() {
	const totalpay = $('#ticket-movie-money2').text();
	const mumberSeats = allSeatsVals;
	const length = JSON.stringify(allSeatsVals);
	sessionStorage.setItem('totalPay', totalpay);
	sessionStorage.setItem('numberSeat', JSON.stringify(mumberSeats));
	sessionStorage.setItem('lenghtSeat', length);
	window.document.location = '/views/ticket/order.ejs';
}
