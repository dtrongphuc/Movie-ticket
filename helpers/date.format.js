module.exports = dowNumberToString = (number) => {
	let string = '';
	switch (number) {
		case 0:
			string = 'CN';
			break;
		case 1:
			string = 'Hai';
			break;
		case 2:
			string = 'Ba';
			break;
		case 3:
			string = 'Tư';
			break;
		case 4:
			string = 'Năm';
			break;
		case 5:
			string = 'Sáu';
			break;
		case 6:
			string = 'Bảy';
			break;
		default:
			break;
	}
	return string;
};
