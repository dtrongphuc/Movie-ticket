const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginMiddleware = require('../middlewares/auth/login.middleware');
const registerMiddleware = require('../middlewares/auth/register.middleware');

router.get(
	'/login',
	loginMiddleware.getGoogleLoginUrl,
	authController.getLogin
);
router.get('/google', authController.getLoginWithGoogle);

router.get('/register', authController.getRegister);
router.post(
	'/register',
	registerMiddleware.validate,
	authController.postRegister
);

module.exports = router;
