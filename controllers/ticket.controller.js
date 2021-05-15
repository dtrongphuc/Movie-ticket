module.exports = {
	getBookingByDate: (req, res) => {
		return res.render('ticket/book');
	},
	bookseat: (req, res) => {
		return res.render('ticket/bookseat');
	},
};
