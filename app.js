require('dotenv').config();
const express = require('express'),
	models = require('./db/connection'),
	expressLayouts = require('express-ejs-layouts'),
	cookieParser = require('cookie-parser'),
	app = express(),
	route = require('./routers/index'),
	{ initPassport } = require('./middlewares/passport/index'),
	theatersRouter = require('./routers/admin/theaters'),
	cinemaRouter = require('./routers/admin/cinema'),
	showtimeRouter = require('./routers/admin/showtime'),
	statisticeRouter = require('./routers/admin/statistics'),
	port = 3000;

// APP CONFIGURE
app.use(require('morgan')('tiny'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

// Passport
initPassport(app);

// Test giao diện content
app.get('/view', (req, res) => res.render('content/content'));

route(app);

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
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
