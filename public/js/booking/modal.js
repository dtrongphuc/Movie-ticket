const ModalPrimary = (className) => {
	const allCheckbox = document.querySelectorAll(`.${className}`);
	const attribute = allCheckbox[0]?.getAttribute('id-modal');
	const seat_modal = document.querySelector(attribute);
	const span = document.getElementsByClassName('seat__modal-close');
	const seatCountSelected = document.querySelector('#Numseats');

	allCheckbox?.forEach((checkbox) => {
		checkbox.addEventListener('click', (e) => {
			// console.log(seat_modal);
			console.log('click');
			if (seatCountSelected.value === '0') {
				console.log('if');
				seat_modal.style.display = 'block';
			}
		});
	});

	for (let i = 0; i < span.length; i++) {
		span[i].addEventListener('click', (e) => {
			// console.log("object");
			seat_modal.style.display = 'none';
		});
	}

	window.addEventListener('click', (e) => {
		if (e.target == seat_modal) {
			seat_modal.style.display = 'none';
		}
	});
};

const className = 'seat-checkbox';
ModalPrimary(className);
