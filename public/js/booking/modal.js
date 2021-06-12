const ModalPrimary = (id) => {
	const btn_modal = document.querySelector(`.${id}`);
	const attribute = btn_modal?.getAttribute('id-modal');
	const seat_modal = document.querySelector(attribute);
	const span = document.getElementsByClassName('seat__modal-close');

	btn_modal?.addEventListener('click', (e) => {
		// console.log(seat_modal);
		seat_modal.style.display = 'block';
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

const id = 'btn-seatmodal';
ModalPrimary(id);
