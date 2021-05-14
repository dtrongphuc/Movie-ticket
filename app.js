require('dotenv').config();
const express = require('express'),
	models = require('./db/connection'),
	cookieParser = require('cookie-parser'),
	app = express(),
	route = require('./routers/index'),
	{ initPassport } = require('./middlewares/passport/index'),

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

// Test giao diện content
app.get('/view', (req, res) => res.render('content/content'));

route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
