const express = require('express');
const router = express.Router();
const controller = require('../../controllers/showtime.admin.controller');

router.use(function (req, resp, next) {
	resp.locals.title = 'Quản Lý Suất Chiếu';
	next();
});
router.get('/', controller.index);
router.get('/getdata', controller.getData);
router.get('/delete/:movie/:cinema', controller.delete);
router.post('/', controller.add);

module.exports = router;
