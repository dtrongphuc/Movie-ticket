const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginMiddleware = require('../middlewares/auth/login.middleware');
const registerMiddleware = require('../middlewares/auth/register.middleware');
const { passport } = require('../middlewares/passport/index');

// LOGIN ROUTES
// GET
router.get('/login', authController.getLogin);

//### GOOGLE
router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/google/callback',
	loginMiddleware.googleLogin,
	authController.postLogin
);

// POST
//### LOCAL
router.post('/login', loginMiddleware.localLogin, authController.postLogin);

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
