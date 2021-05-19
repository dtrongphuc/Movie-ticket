const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home.controller');
const payController = require('../controllers/pay.controller');

router.get('/', homeController.index);

router.get('/home', homeController.indexNew);

router.get('/detail/:id' , homeController.detail);

module.exports = router;