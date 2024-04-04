const express = require('express');


const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const checkApiKey = require('../../middlewares/chekapikey');
const path = require('path');

const router = express.Router();
 
router.post('/register', authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/loginWithGoogle', validate(authValidation.loginWithGoogle), authController.loginWithGoogle);
router.post('/loginWithFacebook', validate(authValidation.loginWithFacebook), authController.loginWithFacebook); 
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.get('/generate-password', validate(authValidation.generatePassword), authController.generatePassword);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', authController.verifyEmail);

router.use('/static', express.static(path.join(__dirname, '../../public')));

router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/change-password', auth(), validate(authValidation.changePassword), authController.changePassword);

module.exports = router;
