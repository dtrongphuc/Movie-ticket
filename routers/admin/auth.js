const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.admin.controller');

router.get('/', controller.index);
router.post('/', controller.login);
router.post('/dang-xuat', controller.logout);
module.exports = router;