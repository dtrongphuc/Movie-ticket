const express = require('express');
const router = express.Router();
const controller = require('../../controllers/statiscics.admin.controller');
const authMiddleware = require('../../middlewares/auth/auth.admin.middleware');

//chặn quyền
router.use(authMiddleware);

router.use(function (req, resp, next) {
    resp.locals.title = 'Thông Kê Doanh Thu';
    next();
});

router.get('/', function (req, res) {
    res.render('admin/statistics/statisticsTheaters', {result: null});
});

router.post('/', controller.theater);

router.get('/phim', function (req, res) {
    res.render('admin/statistics/statisticsMove', {result: null});
});

router.post('/phim', controller.movie);


module.exports = router;