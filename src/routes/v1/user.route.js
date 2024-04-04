const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userController } = require('../../controllers');
const { userValidation } = require('../../validations');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
  .route('/')
  .get(auth(), userController.getUser)
  .post(auth(), validate(userValidation.createUser), userController.createUser);

router.get('/email', userController.getUserByEmail);

router.get('/me', auth(), userController.getUserDataByUserId);
router.put('/me', auth(), validate(userValidation.updateUser), userController.updateUser);

router
  .route('/:id')
  .put(auth(),validate(userValidation.updateUserByAdmin), userController.updateUserByAdmin)
  .delete(auth(), userController.deleteUser)
  .get(userController.getUserById);

module.exports = router;
