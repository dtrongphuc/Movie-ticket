const user = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			allownull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		googleId: {
			type: DataTypes.STRING,
			allownull: true,
			defaultValue: null,
		},
		facebookId: {
			type: DataTypes.STRING,
			allownull: true,
			defaultValue: null,
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
			allownull: true,
			defaultValue: null,
		},
		fullname: {
			type: DataTypes.STRING,
			allownull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allownull: true,
			defaultValue: null,
		},
		role: {
			type: DataTypes.STRING,
			allownull: false,
			validate: {
				isIn: [['admin', 'member']],
			},
			defaultValue: 'member',
		},
		verifyString: {
			type: DataTypes.STRING,
			allownull: true,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allownull: false,
			defaultValue: false,
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
