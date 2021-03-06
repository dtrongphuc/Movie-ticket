const movie = (sequelize, type) => {
	const movie = sequelize.define('movie', {
		id: {
			type: type.INTEGER,
			allownull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: type.STRING,
			allownull: false,
		},
		time: {
			type: type.REAL,
			allownull: false,
		},
		openingDay: {
			type: type.DATE,
			allownull: false,
		},
		description: {
			type: type.TEXT,
			allownull: false,
		},
		directors: {
			type: type.STRING,
			allownull: true,
		},
		posterUrl: {
			type: type.STRING,
			allownull: false,
		},
		posterPublicId: {
			type: type.STRING,
			allownull: false,
		},
		trailerUrl: {
			type: type.STRING,
			allownull: true,
		},
		trailerPublicId: {
			type: type.STRING,
			allownull: true,
		},
	});

	movie.findById = async (id) => {
		let result = await movie.findOne({
			where: {
				id: id,
			},
		});

		return result;
	};

	return movie;
};

module.exports = movie;
