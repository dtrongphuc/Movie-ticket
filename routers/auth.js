const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/auth/authentication');
const authController = require('../controllers/auth.controller');
const loginMiddleware = require('../middlewares/auth/login.middleware');
const registerMiddleware = require('../middlewares/auth/register.middleware');
const { passport } = require('../middlewares/passport/index');

router.get('/logout', authController.logout);
// LOGIN ROUTES
// GET
router.get('/login', authController.getLogin);
router.get('/forgot-pwd', authController.getForgotPwdForm);
router.get('/reset-pwd/:id/:verifyString', authController.getResetPwdForm);
router.get('/pairing', authController.getConfirmPwd);

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

//### FACEBOOK
router.get(
	'/facebook',
	passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
	'/facebook/callback',
	loginMiddleware.facebookLogin,
	authController.postLogin
);

// POST
//### LOCAL
router.post(
	'/login',
	authentication.isActive,
	loginMiddleware.localLogin,
	authController.postLogin
);
router.post('/forgot-pwd', authController.postForgotPwd);
router.post('/reset-pwd', authController.postResetPwd);
router.post('/pairing', authController.postPairing);

// REGISTER ROUTES
// GET
router.get('/register', authController.getRegister);

//POST
router.post(
	'/register',
	registerMiddleware.validate,
	authController.postRegister
);

//VERIFY ACCOUNT
router.get('/verify/:id/:verifyString', authController.verifyAccount);

module.exports = router;
