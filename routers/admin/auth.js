const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.admin.controller');

router.get('/', controller.index);
router.post('/', controller.login);
router.get('/dang-xuat', controller.logout);
module.exports = router;