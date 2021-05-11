const axios = require('axios');

module.exports = {
	getAccessTokenFromCode: async (code) => {
		try {
			const { data } = await axios.post(`https://oauth2.googleapis.com/token`, {
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: 'http://localhost:4000/auth/google',
				grant_type: 'authorization_code',
				code,
			});

			return data.access_token;
		} catch (error) {
			console.log('ERROR: ', error);
		}
	},

	getGoogleUserInfo: async (accessToken) => {
		const { data } = await axios.get(
			'https://www.googleapis.com/oauth2/v2/userinfo',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return data;
	},
};
