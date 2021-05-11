const Cinema = require('./cinema.model');
const Movie = require('./movie.model');

const showtime = (sequelize, type) => {
	const showtime = sequelize.define('showtime', {
		id:{
			type: type.INTEGER,
			allownull: false,
			primaryKey: true,
			autoIncrement: true
		},
		movieId: {
			type: type.INTEGER,
			references: {
                model: Movie, 
                key: 'id'
              }
		},
		cinemaId: {
			type: type.INTEGER,
			references: {
                model: Cinema,
                key: 'id'
            }
		},
		startTime: {
			type: type.DATE,
		},
        endTime: {
			type: type.DATE,
		},  
        fare: {
			type: type.DOUBLE,
		},
	});


	// showtime.findById = async (id) => {
	// 	let result = await showtime.findOne({
	// 		where: {
	// 			id: id,
	// 		},
	// 	});

	// 	return result;
	// };

	return showtime;
};

module.exports = showtime;

