require('dotenv').config();
const express = require('express'),
	models = require('./db/connection'),
	cookieParser = require('cookie-parser'),
	app = express(),
	route = require('./routers/index'),
	{ initPassport } = require('./middlewares/passport/index'),
	homeRouter = require('./routers/home');
port = 3000;

// APP CONFIGURE
// app.use(require('morgan')('tiny'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

// Passport
initPassport(app);
// home
// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function (req, res, next) {
	// if there's a flash message in the session request, make it available in the response, then delete it
	res.locals.currentUser = null;
	res.locals.message = req.session.message;
	delete req.session.message;
	next();
});

app.use('/home', homeRouter);
//---------------------------------------------------------------- ADMIN -----------------------------------------------------
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
