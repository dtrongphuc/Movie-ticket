const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');

router.get('/profile/:id', userController.profile);
router.post('/profile', userController.updateprofile);
router.post('/profile-changePass', userController.changePass);

module.exports = router;