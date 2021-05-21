const moment = require('moment');
const { Op } = require('sequelize');
const { Showtime } = require('../../db/connection');
const dowNumberToString = require('../../helpers/date.format');

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
	let selectedDate =
		req.query?.date || (activeDates.length > 0 ? activeDates[0] : null);
	let currentDate = moment().format('YYYYMMDD');
	if (selectedDate !== null) {
		let dateObj = {
			active: {
				value: selectedDate,
				day: moment(selectedDate, 'YYYYMMDD').date(),
				month: moment(selectedDate, 'YYYYMMDD').month() + 1,
				year: moment(selectedDate, 'YYYYMMDD').year(),
				dow: {
					value: moment(selectedDate, 'YYYYMMDD').day(),
					string: function () {
						return dowNumberToString(this.value);
					},
				},
			},
			dateArr: [],
		};
		for (let i = 0; i < dateSliderCount; ++i) {
			let nextDate = moment(currentDate, 'YYYYMMDD')
				.add(i, 'days')
				.format('YYYYMMDD');
			dateObj.dateArr.push({
				value: nextDate,
				year: moment(nextDate, 'YYYYMMDD').year(),
				month: moment(nextDate, 'YYYYMMDD').month(),
				day: moment(nextDate, 'YYYYMMDD').date(),
				dow: {
					value: moment(nextDate, 'YYYYMMDD').day(),
					string: function () {
						return dowNumberToString(this.value);
					},
				},
				hasMovieShow: activeDates?.includes(nextDate),
			});
		}
		res.locals.dateSlider = dateObj;
	} else {
		res.locals.dateSlider = null;
	}
	next();
};
