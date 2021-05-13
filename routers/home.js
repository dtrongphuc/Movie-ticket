const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controller');
const payController = require('../controllers/pay.controller');

router.get('/', homeController.index);
router.get('/pay', payController.index);

module.exports = router;