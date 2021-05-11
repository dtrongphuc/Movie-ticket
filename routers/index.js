const cinemaRouter = require('./cinema');
const userRouter = require('./user');
const authRouter = require('./auth');

function route(app) {
	app.use('/cinema', cinemaRouter);
	app.use('/user', userRouter);
	app.use('/auth', authRouter);
}

module.exports = route;
