require('dotenv').config();
const express = require('express'),
	models = require('./db/connection'),
	cookieParser = require('cookie-parser'),
	app = express(),
	route = require('./routers/index'),
	{ initPassport } = require('./middlewares/passport/index'),
<<<<<<< HEAD

=======
	theatersRouter = require('./routers/admin/theaters'),
	cinemaRouter = require('./routers/admin/cinema'),
	showtimeRouter = require('./routers/admin/showtime'),
	statisticeRouter = require('./routers/admin/statistics'),
	movieRouter = require('./routers/admin/movie'),
	homeRouter = require('./routers/home');
>>>>>>> 8db795158596663d584cca93b0ab27a5adb769d0
	port = 3000;

// APP CONFIGURE
// app.use(require('morgan')('tiny'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

// Passport
initPassport(app);


route(app);

<<<<<<< HEAD
=======
//----------------------------------------------------------- ADMIN --------------------------------------------------------------

app.get('/admin/dang-nhap', function (req, res) {
	res.render('admin/login');
});

//apply template
app.use(expressLayouts);
app.set('layout', 'admin/layout');
app.use('/admin/', cinemaRouter);
app.use('/admin/suat-phim', showtimeRouter);
app.use('/admin/cum-rap', theatersRouter);
app.use('/admin/thong-ke', statisticeRouter);
app.use('/admin/phim', movieRouter);

// home
app.use('/home', homeRouter);

>>>>>>> 8db795158596663d584cca93b0ab27a5adb769d0
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
