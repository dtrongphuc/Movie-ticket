module.exports = {
	getBooking: (req, res) => {
		return res.render('ticket/book');
	},

	bookseat: (req, res) => {
		return res.render('ticket/bookseat');
	},
	order: (req, res) => {
		return res.render('ticket/order');
	},
};
