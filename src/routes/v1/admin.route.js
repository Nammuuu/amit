const express = require('express');


const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const subscriptionController = require('../../controllers/subscription');

const router = express.Router();

router.post('/register', authController.adminRegister);
router.post('/login', validate(authValidation.login), authController.adminLogin);
router.post('/addSubscription', subscriptionController.adminAddSubscription);
router.post('/fetchSubscription', subscriptionController.fetchSubscription);
router.post('/deleteSubscription', subscriptionController.deleteSubscription);
router.post('/updateSubscription', subscriptionController.updateSubscription);
module.exports = router;