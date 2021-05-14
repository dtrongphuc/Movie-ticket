const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticket.controller');

router.get('/book', ticketController.index);

module.exports = router;