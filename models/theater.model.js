const theater = (sequelize, type) => {
	const theater = sequelize.define('theater', {
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
		address: {
			type: type.STRING,
			allownull: false,
		},
	});

	theater.findById = async (id) => {
		let result = await theater.findOne({
			where: {
				id: id,
			},
		});

		return result;
	};

	return theater;
};

module.exports = theater;

