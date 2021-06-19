const express = require('express');
const homeController = require('../../api/home.api');
const router = express.Router();

router.get('/movie/hot', homeController.topMovies);
router.get('/movie/count/hot', homeController.countHotMovies);
router.get('/movie/count/new-opening', homeController.countNewOpeningMovies);
router.get('/movie/new-opening', homeController.newOpeningMovies);

module.exports = router;
