const express = require('express');
const router = express.Router();
const controller = require('../../controllers/movie.admin.controller');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
let cinemaUpload = upload.fields([
	{
		name: 'imagePoster',
		maxCount: 1,
	},
	{
		name: 'images',
		maxCount: 20,
	},
	{
		name: 'video',
		maxCount: 1,
	},
]);

router.use(function (req, resp, next) {
	resp.locals.title = 'Quản Lý Phim';
	next();
});
router.get('/', controller.index);
router.get('/getdata', controller.getData);
router.get('/delete/:id', controller.delete);
router.get('/chi-tiet/:id', controller.detail);
router.post('/', cinemaUpload, controller.add);

module.exports = router;
