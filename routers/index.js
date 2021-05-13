const { isAuth } = require('../middlewares/auth/authentication');
const cinemaRouter = require('./cinema');
const userRouter = require('./user');
const authRouter = require('./auth');

function route(app) {
	// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
	app.use(function (req, res, next) {
		// if there's a flash message in the session request, make it available in the response, then delete it
		res.locals.message = req.session.message;
		delete req.session.message;
		next();
	});

	app.use('/auth', authRouter);
	// app.use('/', isAuth).get('/', (req, res) => {
	// 	res.render('content/content');
	// });
	app.use('/cinema', cinemaRouter);
	app.use('/user', userRouter);
}

module.exports = route;
