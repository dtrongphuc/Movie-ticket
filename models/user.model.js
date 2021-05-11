const user = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			allownull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			type: DataTypes.STRING,
			allownull: false,
			unique: true,
			validate: {
				notEmpty: true,
				isEmail: true,
			},
		},
		hashedPassword: {
			type: DataTypes.STRING,
			allownull: false,
		},
		fullname: {
			type: DataTypes.STRING,
			allownull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allownull: false,
		},
		role: {
			type: DataTypes.STRING,
			allownull: false,
			validate: {
				isIn: [['admin', 'member']],
			},
		},
	});

	

	User.findByEmail = async (email) => {
		let result = await User.findOne({
			where: {
				email: email,
			},
		});

		return result;
	};

	return User;
};

module.exports = user;
