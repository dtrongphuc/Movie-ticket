const movie = (sequelize, type) => {
	const movie = sequelize.define('movie', {
		id: {
			type: type.INTEGER,
			allownull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: type.STRING,
			allownull: false,
		},
		time: {
			type: type.REAL,
			allownull: false,
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
