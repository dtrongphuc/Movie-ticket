const initLogin = require('./login');
const passport = require('passport');
const { User } = require('../../db/connection');

exports.initPassport = (app) => {
	app.use(
		require('cookie-session')({
			secret: process.env.SESSION_KEY,
			name: 'token',
			cookie: {
				secure: false,
				httpOnly: false,
				maxAge: +process.env.SESSION_LIFE,
			},
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
