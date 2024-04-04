const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const { Users, Address,Admins ,Owner} = require('../models');
const logger = require('../config/logger');
const messages = require('../constant/message.json');
const authService = require('./auth.service');
const tokenService = require('./token.service');

const getExistingEmails = async (email) => {
  logger.info(email);
  return Users.findOne({ where: { email, status: true } });
};

const createUserDetail = async (_userDetailBody) => {
  const userDetailBody = _userDetailBody;

  return Users.create(userDetailBody);
};

const createUser = async (_userBody) => {
  try {
    const userBody = _userBody;
    if (await getExistingEmails(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, messages.EMAIL_ALREADY_EXISTS);
    }
    userBody.email = userBody.email.toLowerCase();
    userBody.password = await bcrypt.hash(userBody.password, 8);
    userBody.loginType = "emailpass";
    const createdUser = await Users.create(userBody);

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
const getUserWithSecretFields = async (email, password) => {
  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    //res.send({ user, tokens });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Users.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: Address }],
    limit,
    offset
  });
  return support;
};

const getUserById2 = async (id) => {
  try {
    const data = await Users.findOne({
      where: { id: id }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};
const getUserBy = async (id) => {
  try {
    const data = await Users.findOne({
      where: { id: id }
    });

    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};
const getUserById = async (id) => {
  try {
    const data = await Users.findOne({
      where: { id: id },
      include: [
        {
          model: Address,
          where: { userId: id }
        }
      ]
    });

    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const data = await Users.findOne({
      where: { email: email, status: true }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};
const getAdminByEmail = async (email) => {
  try {
    const data = await Admins.findOne({
      where: { email: email }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};
const getOwnerByEmail = async (email) => {
  try {
    const data = await Owner.findOne({
      where: { email: email }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};

// update user
// const updateUserById = async (id, newData) => {
//   console.log('id==================================================', id);
//   const findData = await Users.findOne({
//     where: { id: id }
//   });
//   if (findData) {
//     return findData.update(newData, { where: { id: id } });
//   } else {
//     return;
//   }
// };

const updateUserById = async (id, newData) => {
  try {
    const user = await Users.findByPk(id);

    if (user) {
      await user.update(newData);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const updateUserByAdmin = async (id, newData) => {
  try {
    const user = await Users.findByPk(id);

    if (user) {
      await user.update(newData);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// const updateUserPasswordById = async (id, updateBody) => {
//   return Users.update(updateBody, {
//     where: { id }
//   });
// };

const updateUserPasswordById = async (id) => {
  return Users.scope('withSecretColumns').findOne({ where: { id: id } });
};

const deleteUserById = async (userId) => {
  try {
    const user = await Users.findOne({ where: userId });

    if (!user) {
      throw new Error('User not found');
    }
    user.status = 0;
    await user.save();

    console.log('User deleted successfully');

    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserWithSecretFieldsById = async (id) => {
  try {
    const user = await Users.scope('withSecretColumns').findOne({
      where: { id: id }
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user with secret fields by id:', error);
    throw error;
  }
};
// const getUserWithSecretFieldsById = async (id) => {
//   return Users.scope('withSecretColumns').findOne({ where: { id: id } });
// };

const getUserDataByUserId = async (id) => {
  try {
    const data = await Users.findOne({
      where: { id: id, status: true, isActive: true }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};

// const createGoogleUser = async (_userBody) => {
//   const userBody = _userBody;
//   userBody.gAuth =bcrypt.hash(userBody.gAuth);
//  return Users.create(userBody);
// };

const createGoogleUser = async (_userBody) => {
  // const userBody = _userBody;

  // if (Array.isArray(userBody.gAuth) || typeof userBody.gAuth === 'object') {
  //   // Handle the case where gAuth is an array or object (e.g., stringify it)
  //   userBody.gAuth = JSON.stringify(userBody.gAuth);
  // }

  // // Hash the gAuth field
  // userBody.gAuth = await bcrypt.hash(userBody.gAuth, 10);

  return Users.create(_userBody);
};

const createFacebookUser = async (_userBody) => {
  return Users.create(_userBody);
};
module.exports = {
  createUser,
  getUser,
  updateUserById,
  deleteUserById,
  getUserWithSecretFieldsById,
  getUserByEmail,
  getAdminByEmail,
  getOwnerByEmail,
  getUserById,
  getUserWithSecretFields,
  updateUserPasswordById,
  getUserDataByUserId,
  getExistingEmails,
  createGoogleUser,
  createFacebookUser,
  createUserDetail,
  updateUserByAdmin,
  getUserById2,
  getUserBy
};
