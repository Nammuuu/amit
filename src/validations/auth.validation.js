const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
};

const loginWithGoogle = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
  })
};
const loginWithFacebook = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required(),
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const generatePassword = {
  query: Joi.object().keys({
    password: Joi.string().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    role: Joi.string().valid('Customer', 'Admin')
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required()
  })
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
};

module.exports = {
  login,
  logout,
  refreshTokens,
  register,
  generatePassword,
  forgotPassword,
  resetPassword,
  changePassword,
  loginWithGoogle,
  loginWithFacebook,
};
