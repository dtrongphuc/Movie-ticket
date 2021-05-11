const { Sequelize } = require('sequelize');
const userModel = require('../models/user.model');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	logging: false,
});

const models = {
	User: userModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ alter: true });
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

module.exports = models;
