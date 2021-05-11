const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.getLogin);
router.get('/register', authController.getRegister);

module.exports = router;
