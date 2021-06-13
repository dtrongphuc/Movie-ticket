const express = require('express');
const homeController = require('../../controllers/api/home.controller');
const router = express.Router();

router.get('/movie/hot', homeController.topMovie);
router.get('/movie/count/hot', homeController.countHotMovie);

module.exports = router;
