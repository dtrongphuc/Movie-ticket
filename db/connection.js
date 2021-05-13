const { Sequelize } = require('sequelize');
const userModel = require('../models/user.model');
const theatersModel = require('../models/theater.model');
const cimenaModel = require('../models/cinema.model');
const movieModel = require('../models/movie.model');
const imageModel = require('../models/image.model');
const ShowtimeModel = require('../models/showtime.model');
const BookingModel = require('../models/booking.model');
const TicketModel = require('../models/ticket.model');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	logging: false,
});

const models = {
	User: userModel(sequelize, Sequelize),
	Theater: theatersModel(sequelize, Sequelize),
	Cinema: cimenaModel(sequelize, Sequelize),
	Movie: movieModel(sequelize, Sequelize),
	Image: imageModel(sequelize, Sequelize),
	Showtime: ShowtimeModel(sequelize, Sequelize),
	Booking: BookingModel(sequelize, Sequelize),
	Ticket: TicketModel(sequelize, Sequelize),
	sequelize
};

models.Theater.hasMany(models.Cinema);
models.Cinema.belongsTo(models.Theater);

models.Movie.hasMany(models.Image), 
models.Image.belongsTo(models.Movie);

models.User.hasOne(models.Booking);
models.Booking.belongsTo(models.User);

models.Showtime.hasOne(models.Booking);
models.Booking.belongsTo(models.Showtime);

models.Movie.hasMany(models.Showtime);
models.Showtime.belongsTo(models.Movie);

models.Cinema.hasMany(models.Showtime);
<<<<<<< HEAD
=======

models.Cinema.hasOne(models.Showtime);
>>>>>>> 2ed503d417b66ada9f0738037a89cd872a8ad012
models.Showtime.belongsTo(models.Cinema);

models.Booking.hasOne(models.Ticket);
models.Ticket.belongsTo(models.Booking);
sequelize.sync({ alter: true }).then(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
});

module.exports = models;
