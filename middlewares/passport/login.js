const models = require('../../db/connection'),
	{ comparePassword } = require('../validate/password.validate'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth20').Strategy;
const { checkEmailExisted } = require('../validate/email.validate');

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
					let check = checkEmailExisted(userEmail);
					if (check) {
						return cb(null, false, {
							content:
								'Email đã được đăng ký, vui lòng đăng nhập bằng mật khẩu',
							type: 'error',
						});
					}
					let [user, isCreated] = await models.User.findOrCreate({
						where: {
							googleId: profile.id,
						},
						defaults: {
							googleId: profile.id,
							email: userEmail,
							fullname: profile.displayName,
						},
					});

					return cb(null, user);
				} catch (error) {
					console.log('error: ', error);
					return cb(error, null);
				}
			}
		)
	);
};
