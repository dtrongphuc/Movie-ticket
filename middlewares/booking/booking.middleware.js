const moment = require('moment');

const dofNumberToString = (number) => {
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

module.exports = {
	dateQuery: (req, res, next) => {
		// render 14 days to slider
		const dateSliderCount = 14;

		let selectedDate = req.query?.date || moment().format('YYYYMMDD');
		let dateArr = [
			{
				active: selectedDate,
				value: selectedDate,
				year: moment(selectedDate, 'YYYYMMDD').year(),
				month: moment(selectedDate, 'YYYYMMDD').month(),
				day: moment(selectedDate, 'YYYYMMDD').date(),
				dof: {
					value: moment(selectedDate, 'YYYYMMDD').day(),
					string: function () {
						return dofNumberToString(this.value);
					},
				},
				hasMovieShow: true,
			},
		];
		for (let i = 1; i < dateSliderCount; ++i) {
			let nextDate = moment(selectedDate, 'YYYYMMDD')
				.add(i, 'days')
				.format('YYYYMMDD');
			dateArr.push({
				value: nextDate,
				year: moment(nextDate, 'YYYYMMDD').year(),
				month: moment(nextDate, 'YYYYMMDD').month(),
				day: moment(nextDate, 'YYYYMMDD').date(),
				dof: {
					value: moment(nextDate, 'YYYYMMDD').day(),
					string: function () {
						return dofNumberToString(this.value);
					},
				},
			});
		}
		res.locals.dateSlider = dateArr;
		next();
	},
};
