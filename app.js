require('dotenv').config();
const express = require('express');
const models = require('./db/connection');
var expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const app = express();
const route = require('./routers/index');
const theatersRouter = require('./routers/admin/theaters');
const cinemaRouter = require('./routers/admin/cinema');
const showtimeRouter = require('./routers/admin/showtime');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		// cookie: { secure: true },
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('index'));

// Test giao diện content
app.get('/view', (req, res) => res.render('content/content'));

route(app);

//----------------------------------------------------------- ADMIN --------------------------------------------------------------
//apply template
app.use(expressLayouts);
app.set('layout', 'admin/layout');
app.use('/admin/', cinemaRouter);
app.use('/admin/suat-phim', showtimeRouter);
app.use('/admin/cum-rap', theatersRouter);
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
