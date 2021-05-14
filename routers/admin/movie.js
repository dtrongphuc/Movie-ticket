const express = require('express');
const router = express.Router();
const controller = require('../../controllers/movie.admin.controller');
const authMiddleware = require('../../middlewares/auth/auth.admin.middleware');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

//chặn quyền
router.use(authMiddleware);

router.use(function (req, resp, next) {
    resp.locals.title = 'Quản Lý Phim';
    next();
});
router.get('/', controller.index);
router.get('/getdata', controller.getData);
router.get('/delete/:id', controller.delete);
router.post('/', upload.single('image'), controller.add);

module.exports = router;