const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { firebaseController } = require('../../controllers');
const router = express.Router();

// router.get('/', auth(), contactController.getAllContact);
router.get('/',  firebaseController.getData);
router.post('/',  firebaseController.signup);

module.exports = router;
