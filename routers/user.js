const express = require('express')
const router = express.Router()
const userController = require('../controllers/User.Controller');

router.get('/profile/:id', userController.profile);

module.exports = router;