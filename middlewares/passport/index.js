const initLogin = require('./login');
const passport = require('passport');
const { User } = require('../../db/connection');

exports.initPassport = (app) => {
	app.use(
		require('express-session')({
			secret: 'keyboard cat',
			resave: false,
			saveUninitialized: false,
			cookie: { secure: false, httpOnly: false },
			expires: +process.env.SESSION_LIFE,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	initLogin(passport);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(async function (id, done) {
		try {
			let user = await User.findByPk(id);
			done(null, user);
		} catch (error) {
			return done(err);
		}
	});
};

exports.passport = passport;
