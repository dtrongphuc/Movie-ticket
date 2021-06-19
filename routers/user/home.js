const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home.controller');

router.get('/', homeController.index);

router.get('/new', homeController.indexNew);

router.get('/detail/:id', homeController.detail);

module.exports = router;
