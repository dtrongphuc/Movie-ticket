const { Op } = require('sequelize');
const models = require('../db/connection');
const moment = require('moment');
const dowNumberToString = require('../helpers/date.format');

const getTheaters = async () => {
	try {
		let theaters = await models.Theater.findAll({
			include: {
				model: models.Cinema,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'theaterId'],
				},
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'address'],
			},
		});

		let mapCount = theaters.map((theater) => {
			let theaterObj = theater.get({ plain: true });

			let count = theaterObj?.cinemas?.length;
			theaterObj.count = count;

			return theaterObj;
		});
		return mapCount;
	} catch (error) {
		console.log(error);
	}
};

const getByDateCinema = async (date, cinema) => {
	try {
		// ?date=''&cinema=''
		if (!date || !cinema) {
			return res.status(500).json({
				success: false,
				message: 'date and cinema required',
			});
		}

		// start time between 10 days before and 20 days after
		let allShowtime = await models.Showtime.findAll({
			where: {
				startTime: {
					[Op.between]: [
						moment().subtract(10, 'days'),
						moment().add(20, 'days'),
					],
				},
			},
			include: models.Movie,
			attributes: ['movie.id'],
			group: ['movie.id'],
		});

		let availableShowtime = await models.Showtime.findAll({
			where: {
				startTime: {
					[Op.and]: [
						{
							[Op.gte]: moment(date, 'YYYYMMDD').format(),
						},
						{
							[Op.gte]: Date.now(),
						},
						{
							[Op.lt]: moment(date, 'YYYYMMDD').endOf('day').format(),
						},
					],
				},
				cinemaId: cinema,
			},
			include: models.Movie,
			attributes: ['movie.id'],
			group: ['movie.id'],
		});

		let availableMoviesId = availableShowtime?.map(
			(st) => st.get({ plain: true }).movie.id
		);

		let mapActive = await Promise.all(
			allShowtime?.map(async (mv) => {
				let mvObj = mv.get({ plain: true });

				return {
					id: mvObj.movie.id,
					name: mvObj.movie.name,
					active: availableMoviesId.includes(mvObj.movie.id),
				};
			})
		);

		return mapActive;
	} catch (error) {
		console.log(error);
	}
};

const getByMovie = async (date, movieId) => {
	try {
		if (!movieId || !date) {
			throw new Error('movieId and date is required');
		}

		let startDate = moment(date, 'YYYYMMDD').startOf('day').format();
		let endDate = moment(date, 'YYYYMMDD').endOf('day').format();

		let theaters = await models.Theater.findAll({
			include: {
				model: models.Cinema,
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'theaterId'],
				},
				include: {
					model: models.Showtime,
					attributes: ['id', 'movieId', 'startTime', 'endTime'],
				},
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'address'],
			},
		});

		let mapWithTime = theaters.map((theater) => {
			let theaterObj = theater.get({ plain: true });
			let cinemaMap = theaterObj.cinemas.map((cinema) => {
				let stFilter = cinema.showtimes.filter((showtime) => {
					return (
						moment(showtime.startTime).isBetween(startDate, endDate) &&
						moment(showtime.startTime).isAfter(moment()) &&
						showtime.movieId === +movieId
					);
				});

				if (stFilter.length > 0) {
					cinema.active = true;
				} else {
					cinema.active = false;
				}

				return cinema;
			});

			let count = cinemaMap.filter((cinema) => cinema.active === true);
			return {
				...theaterObj,
				count: count.length,
			};
		});
		return mapWithTime;
	} catch (error) {
		console.log(error);
	}
};

const getMovies = async () => {
	try {
		let showtime = await models.Showtime.findAll({
			where: {
				startTime: {
					[Op.between]: [
						moment().subtract(10, 'days'),
						moment().add(20, 'days'),
					],
				},
			},
			include: models.Movie,
			attributes: ['movie.id'],
			group: ['movie.id'],
		});

		let movies = await Promise.all(
			showtime?.map(async (st) => {
				return {
					id: st.movie.id,
					name: st.movie.name,
					active: true,
				};
			})
		);

		return movies;
	} catch (error) {
		console.log(error);
	}
};

const getShowtimeInfo = async (date, movieId, cinemaId) => {
	try {
		let showtimes = await models.Showtime.findAll({
			where: {
				movieId: movieId,
				cinemaId: cinemaId,
				startTime: {
					[Op.and]: [
						{
							[Op.gte]: moment(date, 'YYYYMMDD').format(),
						},
						{
							[Op.gte]: Date.now(),
						},
						{
							[Op.lt]: moment(date, 'YYYYMMDD').endOf('day').format(),
						},
					],
				},
			},
			include: [
				{
					model: models.Cinema,
					attributes: ['id', 'name', 'type', 'length', 'width'],
				},
				{
					model: models.Movie,
					attributes: ['id', 'name', 'time'],
				},
			],
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});

		let mapShowtimes = await Promise.all(
			showtimes?.map(async (showtime) => {
				let plain = showtime.get({ plain: true });
				let countseat = await models.Ticket.count({
					include: [
						{
							model: models.Booking,
							where: {
								showtimeId: showtime.id,
							},
						},
					],
				});
				plain.duringTime = `${moment(plain.startTime).format(
					'HH:mm'
				)} ~ ${moment(plain.endTime).format('HH:mm')}`;
				plain.time = moment(plain.startTime).format('HH:mm');
				plain.cinema = {
					...plain.cinema,
					seat: parseInt(plain.cinema.width) * parseInt(plain.cinema.length),
					booked: countseat,
				};

				return plain;
			})
		);

		return mapShowtimes;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getWithQuery: async (req, res) => {
		const { date, theaterId, cinemaId, movieId } = req.query;
		if (!theaterId && !cinemaId && !movieId && !date) {
			return res.status(200).json({
				success: true,
				theaters: [],
				movies: [],
			});
		} else if (movieId && !cinemaId) {
			let [theaters, movies] = await Promise.all([
				getByMovie(date, movieId),
				getMovies(),
			]);

			return res.status(200).json({
				success: true,
				theaters: theaters,
				movies: movies,
			});
		} else if (!theaterId && !cinemaId && !movieId) {
			let [theaters, movies] = await Promise.all([getTheaters(), getMovies()]);

			return res.status(200).json({
				success: true,
				theaters: theaters,
				movies: movies,
			});
		} else if (theaterId && !cinemaId && !movieId) {
			let [theaters, movies] = await Promise.all([getTheaters(), getMovies()]);

			return res.status(200).json({
				success: true,
				theaters: theaters,
				movies: movies,
			});
		} else if (date && cinemaId && !movieId) {
			let [theaters, movies] = await Promise.all([
				getTheaters(),
				getByDateCinema(date, cinemaId),
			]);

			return res.status(200).json({
				success: true,
				theaters: theaters,
				movies: movies,
			});
		} else if (date && theaterId && cinemaId && movieId) {
			let [theaters, movies, showtime] = await Promise.all([
				getByMovie(date, movieId),
				getByDateCinema(date, cinemaId),
				getShowtimeInfo(date, movieId, cinemaId),
			]);

			return res.status(200).json({
				success: true,
				theaters: theaters,
				movies: movies,
				show: showtime,
			});
		}

		return res.status(500).json({
			success: false,
			message: error,
		});
	},

	getFirstAvailableShowtime: async (req, res) => {
		try {
			const st = await models.Showtime.findAll({
				where: {
					startTime: {
						[Op.gte]: Date.now(),
					},
				},
				order: [['startTime', 'ASC']],
			});

			if (st.length <= 0) {
				return res.status(200).json({
					success: true,
					initDate: null,
				});
			}

			let time = st[0].get({ plain: true }).startTime;
			return res.status(200).json({
				success: true,
				initDate: moment(time).format('YYYYMMDD'),
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},

	getDuringTime: async (req, res) => {
		try {
			const { id } = req.query;

			let showtime = await models.Showtime.findByPk(id);
			let duringTime = `${moment(showtime.startTime).format(
				'HH:mm'
			)} ~ ${moment(showtime.endTime).format('HH:mm')}`;

			return res.status(200).json({
				success: true,
				duringTime,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},

	getDateString: (req, res) => {
		try {
			const { date } = req.query;
			const dateMoment = moment(date, 'YYYYMMDD');

			let dayOfWeekString = dowNumberToString(dateMoment.day());
			let dateString = `${dateMoment.date()}/${
				dateMoment.month() + 1
			}/${dateMoment.year()} (${dayOfWeekString})`;

			console.log(dateString);
			return res.status(200).json({
				success: true,
				dateString,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},

	getMovieInfo: async (req, res) => {
		try {
			const { id } = req.query;

			const movie = await models.Movie.findByPk(id, {
				attributes: ['id', 'name', 'posterUrl'],
			});

			return res.status(200).json({
				success: true,
				movie,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},

	getFare: async (req, res) => {
		try {
			const { id } = req.query;
			let showtime = await models.Showtime.findByPk(id);
			let fare = showtime.fare;

			return res.status(200).json({
				success: true,
				fare,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error,
			});
		}
	},
};
