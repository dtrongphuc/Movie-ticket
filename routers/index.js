const expressLayouts = require('express-ejs-layouts');
const { isAuth } = require('../middlewares/auth/authentication');
const cinemaRouter = require('./cinema');
const userRouter = require('./user');
const authRouter = require('./auth');
<<<<<<< HEAD
const adminRouter = require('./admin/index');
const authAdminRouter = require('./admin/auth');
=======
const homeRouter = require('./home');
>>>>>>> 8db795158596663d584cca93b0ab27a5adb769d0

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
	app.use('/admin/dang-nhap', authAdminRouter);

	// apply template layout
	app.use(expressLayouts);
	app.set('layout', 'admin/layout');
	app.use('/admin', function(req, res, next) {
		const path = req.url.split('/')[1];
		let location = 'trang-chu';
		let u3;
		switch(path) {
			case '':
				location = 'trang-chu';
				break;
			case 'cum-rap':
				location = 'cum-rap';
				break;
			case 'phim':
				location = 'phim';
				break;
			case 'suat-phim':
				location = 'suat-phim';
				break;
			case 'thong-ke':
				u3 = req.url.split('/')[2];
				if(u3 == 'phim'){
					location = 'thong-ke/phim';
				}else{
					location = 'thong-ke';
				}
				break;
		}

		res.locals.location = location;
		next();
	}, adminRouter);
	app.use('/home', homeRouter);
}

module.exports = route;
