module.exports = {
	// login
	getLogin: (req, res) => {
		res.render('auth/login');
	},

	// register
	getRegister: (req, res) => {
		res.render('auth/register');
	},
};
