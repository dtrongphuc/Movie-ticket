const { isAuth } = require('../middlewares/auth/authentication');
const cinemaRouter = require('./cinema');
const userRouter = require('./user');
const authRouter = require('./auth');

function route(app) {
	app.use('/auth', authRouter);
	app.use('/', isAuth).get('/', (req, res) => {
		res.render('content/content');
	});
	app.use('/cinema', cinemaRouter);
	app.use('/user', userRouter);
}

module.exports = route;
