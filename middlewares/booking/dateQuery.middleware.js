const moment = require('moment');
const { Op } = require('sequelize');
const { Showtime } = require('../../db/connection');

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

const getAvailableDate = async () => {
	const st = await Showtime.findAll({
		where: {
			startTime: {
				[Op.gte]: Date.now(),
			},
		},
	});

	return st.map((stime) => {
		return moment(stime.startTime).format('YYYYMMDD');
	});
};

module.exports = async (req, res, next) => {
	// render 14 days to slider
	const dateSliderCount = 14;
	let activeDates = await getAvailableDate();
	let selectedDate = req.query?.date || moment().format('YYYYMMDD');
	let dateObj = {
		active: {
			value: selectedDate,
			day: moment(selectedDate, 'YYYYMMDD').date(),
			month: moment(selectedDate, 'YYYYMMDD').month() + 1,
			year: moment(selectedDate, 'YYYYMMDD').year(),
		},
		dateArr: [],
	};
	for (let i = 0; i < dateSliderCount; ++i) {
		let nextDate = moment(selectedDate, 'YYYYMMDD')
			.add(i, 'days')
			.format('YYYYMMDD');
		dateObj.dateArr.push({
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
			hasMovieShow: activeDates?.includes(nextDate),
		});
	}

	res.locals.dateSlider = dateObj;
	next();
};
