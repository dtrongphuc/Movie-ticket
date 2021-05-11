const queryString = require('query-string');

module.exports = {
	getGoogleLoginUrl: (req, res, next) => {
		try {
			const stringifiedParams = queryString.stringify({
				client_id: process.env.GOOGLE_CLIENT_ID,
				redirect_uri: 'http://localhost:4000/auth/google',
				scope: [
					'https://www.googleapis.com/auth/userinfo.email',
					'https://www.googleapis.com/auth/userinfo.profile',
				].join(' '), // space seperated string
				response_type: 'code',
				access_type: 'offline',
				prompt: 'consent',
			});

			const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
			res.locals.googleLoginUrl = googleLoginUrl;
		} catch (error) {
			console.log('get google login url error', error);
		} finally {
			next();
		}
	},
};
