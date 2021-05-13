const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginMiddleware = require('../middlewares/auth/login.middleware');
const registerMiddleware = require('../middlewares/auth/register.middleware');

// LOGIN ROUTES
// GET
router.get(
	'/login',
	loginMiddleware.getGoogleLoginUrl,
	authController.getLogin
);
router.get('/google', authController.getLoginWithGoogle);
// POST
router.post(
	'/login',
	loginMiddleware.getGoogleLoginUrl,
	loginMiddleware.login,
	authController.postLogin
);

// REGISTER ROUTES
// GET
router.get('/register', authController.getRegister);

//POST
router.post(
	'/register',
	registerMiddleware.validate,
	authController.postRegister
);

module.exports = router;
