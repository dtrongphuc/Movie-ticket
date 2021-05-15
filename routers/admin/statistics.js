const express = require('express');
const router = express.Router();
const controller = require('../../controllers/statiscics.admin.controller');

router.use(function (req, resp, next) {
	resp.locals.title = 'Thông Kê Doanh Thu';
	next();
});

router.get('/', function (req, res) {
	res.render('admin/statistics/statisticsTheaters');
});

router.get('/getdata/:start/:end', controller.theater);

router.get('/phim', function (req, res) {
	res.render('admin/statistics/statisticsMove');
});

router.post('/phim', controller.movie);

module.exports = router;
