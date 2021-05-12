const express = require('express');
const router = express.Router();
const controller = require('../../controllers/statiscics.admin.controller');

router.use(function (req, resp, next) {
    resp.locals.title = 'Thông Kê Doanh Thu';
    next();
});

router.get('/', function (req, res) {
    res.render('admin/statistics/statisticsTheaters', {movie: null, cinema: null});
});

router.post('/', controller.theater);

router.get('/movie', function (req, res) {
    res.render('statistics/statisticsMove');
});


module.exports = router;