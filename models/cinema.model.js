const cinema = (sequelize, type) => {
	const cinema = sequelize.define('cinema', {
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
		type: {
			type: type.STRING,
			allownull: false,
		},
        length: {
			type: type.REAL,
			allownull: false,
		},
        width: {
			type: type.REAL,
			allownull: false,
		},
	});


	cinema.findById = async (id) => {
		let result = await cinema.findOne({
			where: {
				id: id,
			},
		});

		return result;
	};

	return cinema;
};

module.exports = cinema;

