const express = require('express');


const validate = require('../../middlewares/validate');
const ownerController = require('../../controllers/owner.controller');

const router = express.Router();

router.post('/register', ownerController.ownerRegister);
router.post('/login', ownerController.ownerLogin);
module.exports = router;