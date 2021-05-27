const expressLayouts = require('express-ejs-layouts');
const { isAuth } = require('../middlewares/auth/authentication');
const movieRouter = require('./movie');
const userRouter = require('./user');
const authRouter = require('./auth');
const adminRouter = require('./admin/index');
const authAdminRouter = require('./admin/auth');
const homeRouter = require('./home');
const ticketRouter = require('./ticket');
const bookingApi = require('./api/booking');

function route(app) {
	app.use('/api', bookingApi);
	
	app.use('/auth' ,isAuth, authRouter);
	
	//app.use('/', );
	
	app.use('/', isAuth, homeRouter);
	app.use('/ticket',  isAuth, ticketRouter);

	app.use('/movie', movieRouter);
	app.use('/user', userRouter);
	app.use('/admin/dang-nhap', authAdminRouter);


	//----------------------------------------ADMIN-------------------------//
	// apply template layout
	app.use(expressLayouts);
	app.set('layout', 'admin/layout');
	app.use(
		'/admin',
		function (req, res, next) {
			const path = req.url.split('/')[1];
			console.log("a "+ path);
			let location = 'trang-chu';
			let u3;
			switch (path) {
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
					if (u3 == 'phim') {
						location = 'thong-ke/phim';
					} else {
						location = 'thong-ke';
					}
					break;
			}

			res.locals.location = location;
			next();
		},
		adminRouter
	);
	
}

module.exports = route;
