const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService, cartService, emailService, wishlistService } = require('../services');
const config = require('../config/config');
const { Admins } = require('../models');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // await cartService.createCart(user.id);
  // const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  // const tokens = await tokenService.generateAuthTokens(user);
  // const host = config.email.CUSTOMER_HOST;
  // await emailService.sendVerificationEmail(req.body.email, verifyEmailToken, host);
  res.status(200).send({ message: 'register successfully', user });
});

const adminRegister = catchAsync(async (req, res) => {
  const values = {name:req.body.name, email:req.body.email,password:await bcrypt.hash(req.body.password, 8)};
  console.log("values are : ",values);
  const user = await Admins.create(values);
  // await cartService.createCart(user.id);
  // const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  // const tokens = await tokenService.generateAuthTokens(user);
  // const host = config.email.CUSTOMER_HOST;
  // await emailService.sendVerificationEmail(req.body.email, verifyEmailToken, host);
  res.status(200).send({ message: 'register successfully', user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  if (user) {
    // const data = await cartService.createCart(user.id);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ message: 'Login Successfully!!', user, tokens });
  } else {
    res.send({ message: 'Invalid email or password'});
  }
});

const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const admin = await authService.loginAdminWithEmailAndPassword(email, password);

  if (admin) {
    const tokens = await tokenService.generateAuthTokens(admin);
    res.send({ message: 'Login Successfully!!', admin, tokens });
  } else {
    res.send({ message: 'Invalid email or password'});
  }
});

const loginWithGoogle = catchAsync(async (req, res) => {
  try {
    // return;
    const existUser = await userService.getExistingEmails(req.body.email);
    if (existUser) {
      const user = await authService.loginWithGoogle(req.body.email);
      const tokens = await tokenService.generateAuthTokens(user);
      // await userService.updateUserById(existUser.dataValues.id, { gLogin: true });
      res.send({ user, tokens });
    } else {
      const user = await userService.createGoogleUser({
        email: req.body.email,
        name: req.body.name,
        loginType: "google",
      });

      // const userDetailBody = {
      //   // id: user.dataValues.id,
      //   firstName: user.dataValues.firstName,
      //   lastName: user.dataValues.lastName,
      //   phoneNumber: user.dataValues.phoneNumber,
      //   email: user.dataValues.email
      // };

      // await userService.createUserDetail(userDetailBody);
      const tokens = await tokenService.generateAuthTokens(user);
      // await cartService.createCartToGoggle(user.dataValues.id);
      res.send({ user, tokens });
    }
  } catch (err) {
    console.log('error=====', err);
  }
});
const loginWithFacebook = catchAsync(async (req, res) => {
  try {
    // return;
    const existUser = await userService.getExistingEmails(req.body.email);
    if (existUser) {
      const user = await authService.loginWithFacebook(req.body.email);
      const tokens = await tokenService.generateAuthTokens(user);
      // await userService.updateUserById(existUser.dataValues.id, { gLogin: true });
      res.send({ user, tokens });
    } else {
      const user = await userService.createFacebookUser({
        email: req.body.email,
        name: req.body.name,
        loginType: "facebook",
      });

      // const userDetailBody = {
      //   // id: user.dataValues.id,
      //   firstName: user.dataValues.firstName,
      //   lastName: user.dataValues.lastName,
      //   phoneNumber: user.dataValues.phoneNumber,
      //   email: user.dataValues.email
      // };

      // await userService.createUserDetail(userDetailBody);
      const tokens = await tokenService.generateAuthTokens(user);
      // await cartService.createCartToGoggle(user.dataValues.id);
      res.send({ user, tokens });
    }
  } catch (err) {
    console.log('error=====', err);
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const generatePassword = catchAsync(async (req, res) => {
  const password = await bcrypt.hash(req.query.password, 8);
  res.send({ password });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  if (!req.user.isEmailVerified) {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    if (req.user.role === 'Admin') {
      host = config.email.ADMIN_HOST;
    } else if (req.user.role === 'Customer') {
      host = config.email.CUSTOMER_HOST;
    }
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken, host);
    // res.status(httpStatus.NO_CONTENT).send();
    res.send(verifyEmailToken);
    res.send('Verification Email is sent successfully!!');
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'Email already verified');
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.OK).send('Email Verified Successfully!');
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  let host;
  // if (req.body.role === 'Admin') {
  //   host = config.email.adminHost;
  // } else if (req.body.role === 'Customer') {
  //   host = config.email.CUSTOMER_HOST;
  // }
  host = config.email.CUSTOMER_HOST;
  const data = await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken, host);
  // res.status(httpStatus.NO_CONTENT).send();
  res.send({ message: 'Email sent successfully!!' });
});

const resetPassword = catchAsync(async (req, res) => {
  const data = await authService.resetPassword(req.query.token, req.body.password);
  res.send(data);
});

const changePassword = catchAsync(async (req, res) => {
  const userWithSecretFields = await userService.getUserWithSecretFieldsById(req.user.dataValues.id);
  const password = req.body.oldPassword;
  if (!(await bcrypt.compare(password, userWithSecretFields.password))) {
    res.status(400).send({ message: 'Incorrect Old password!' });
  } else {
    const userBody = {
      password: await bcrypt.hash(req.body.newPassword, 8)
    };
    await userService.updateUserById(req.user.dataValues.id, userBody);
  }
  res.status(httpStatus.OK).send({ message: 'Password Changed Successfully' });
});

module.exports = {
  register,
  adminRegister,
  login,
  adminLogin,
  logout,
  refreshTokens,
  generatePassword,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  loginWithGoogle,
  loginWithFacebook,
};
