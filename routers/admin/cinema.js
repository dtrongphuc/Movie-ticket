const express = require('express');
const router = express.Router();
const controller = require('../../controllers/cinema.admin.controller');

router.use(function (req, resp, next) {
	resp.locals.title = 'Quản Lý Rạp';
	next();
});
router.get('/', controller.index);
router.get('/getdata', controller.getData);
router.get('/delete/:id', controller.delete);
router.post('/', controller.add);

module.exports = router;
