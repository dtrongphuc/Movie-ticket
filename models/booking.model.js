const booking = (sequelize, type) => {
	const booking = sequelize.define('booking', {
		id: {
			type: type.INTEGER,
			allownull: false,
			primaryKey: true,
			defaultValue: type.INTEGER,
		},
		time: {
			type: type.DATE,
		},
        total: {
			type: type.DOUBLE,
		},
	});

	booking.findById = async (id) => {
		let result = await booking.findOne({
			where: {
				id: id,
			},
		});

		return result;
	};

	return booking;
};

module.exports = booking;

