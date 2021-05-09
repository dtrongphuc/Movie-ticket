const express = require('express')
const router = express.Router()
const cinemaController = require('../controllers/cinema.controller');

router.get('/detail', cinemaController.index);

module.exports = router;