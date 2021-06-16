const models = require('../../db/connection'),
	{ comparePassword } = require('../validate/password.validate'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth20').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function initLogin(passport) {
	// Local login
	passport.use(
		'local-login',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async function (username, password, done) {
				try {
					let user = await models.User.findOne({
						where: {
							email: username,
						},
					});
					if (!user) {
						console.log('user not found with email ', username);
						return done(null, false, {
							content: 'Tài khoản hoặc mật khẩu không chính xác',
							type: 'error',
						});
					}

					if (!(await comparePassword(password, user.hashedPassword))) {
						console.log('Invalid password');
						return done(null, false, {
							content: 'Tài khoản hoặc mật khẩu không chính xác',
							type: 'error',
						});
					}
					return done(null, user);
				} catch (error) {
					return done(null, false, {
						content: 'Tài khoản hoặc mật khẩu không chính xác',
						type: 'error',
					});
				}
			}
		)
	);

	// Using google
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: process.env.GOOGLE_CB_URL,
			},
			async function (accessToken, refreshToken, profile, cb) {
				try {
					let userEmail = profile?.emails[0]?.value;
					let user = await models.User.findOne({
						where: {
							email: userEmail,
						},
					});
					if (!user) {
						user = await models.User.create({
							googleId: profile.id,
							email: userEmail,
							fullname: profile.displayName,
							active: true,
						});
					} else if (
						!user.googleId &&
						!user.facebookId &&
						user.email === userEmail
					) {
						return cb(null, profile, {
							content:
								'Email đã được đăng ký, vui lòng xác nhận mật khẩu để liên kết',
							type: 'redirect',
						});
					} else if (
						!user.googleId &&
						user.facebookId &&
						user.email === userEmail
					) {
						user.googleId = profile.id;
						await user.save();
					}

					return cb(null, user);
				} catch (error) {
					console.log('error: ', error);
					return cb(error, null);
				}
			}
		)
	);

	// Using Facebook
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: process.env.FACEBOOK_CB_URL,
				profileFields: ['id', 'displayName', 'email'],
			},
			async function (accessToken, refreshToken, profile, cb) {
				try {
					let userEmail = profile?.emails[0]?.value;
					let user = await models.User.findOne({
						where: {
							email: userEmail,
						},
					});
					if (!user) {
						user = await models.User.create({
							facebookId: profile.id,
							email: userEmail,
							fullname: profile.displayName,
							active: true,
						});
					} else if (
						!user.facebookId &&
						!user.googleId &&
						user.email === userEmail
					) {
						return cb(null, profile, {
							content:
								'Email đã được đăng ký, vui lòng xác nhận mật khẩu để liên kết',
							type: 'redirect',
						});
					} else if (
						!user.facebookId &&
						user.googleId &&
						user.email === userEmail
					) {
						user.facebookId = profile.id;
						await user.save();
					}

					return cb(null, user);
				} catch (error) {
					console.log('error: ', error);
					return cb(error, null);
				}
			}
		)
	);
};
