

class CinemaController{
    async index(req, res, next) {

        res.render('cinema/Detail');
    }
}

module.exports = new CinemaController;