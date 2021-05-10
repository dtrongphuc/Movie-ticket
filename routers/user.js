const express = require('express')
const router = express.Router()
const userController = require('../controllers/User.Controller');

router.get('/profile', userController.index);

module.exports = router;