

class TicketController {
    async index(req, res) {
        res.render('ticket/book');
        // res.render('cinema/detail');
    }
}

module.exports = new TicketController 