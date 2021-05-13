const models = require('../../db/connection');
const { comparePassword } = require('../../helpers/validate/password.validate');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function initLogin(passport) {
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
};
