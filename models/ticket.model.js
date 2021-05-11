const ticket = (sequelize, DataTypes) => {
	const ticket = sequelize.define('ticket', {
		id: {
			type: DataTypes.UUID,
			allownull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		seatId: {
			type: DataTypes.STRING,
			allownull: false,
		},
		price: {
			type: DataTypes.DOUBLE,
		},
	});

	

	ticket.findByid = async (id) => {
		let result = await ticket.findOne({
			where: {
				id: id,
			},
		});

		return result;
	};

	return ticket;
};

module.exports = ticket;
