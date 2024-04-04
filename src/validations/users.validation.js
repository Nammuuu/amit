const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required().email(),
    emailVerify: Joi.boolean().required(),
    password: Joi.string().required(),
    addressId: Joi.number().required(),
    dob: Joi.date().required(),
    role: Joi.string().valid('Admin', 'Customer').required(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateUserByAdmin = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phoneNumber: Joi.number().optional(),
    // email: Joi.string().optional().email(),
    emailVerify: Joi.boolean().optional(),
    // password: Joi.string().required(),
    addressId: Joi.number().optional(),
    dob: Joi.date().optional(),
    // role: Joi.string().valid('Admin', 'Customer').optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateUser = {
  body: Joi.object().keys({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phoneNumber: Joi.number().optional(),
    // email: Joi.string().optional().email(),
    emailVerify: Joi.boolean().optional(),
    // password: Joi.string().required(),
    addressId: Joi.number().optional(),
    dob: Joi.date().optional(),
    // role: Joi.string().valid('Admin', 'Customer').optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

module.exports = {
  createUser,
  updateUser,
  updateUserByAdmin
};
