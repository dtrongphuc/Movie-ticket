const express = require('express')
const router = express.Router()
const cinemaController = require('../controller/Cinema.Controller');

router.get('/detail', cinemaController.index);

module.exports = router;