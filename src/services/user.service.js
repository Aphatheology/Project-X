const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
const logger = require('../config/logger');
const { tokenTypes } = require('../config/tokens');

const isEmailTaken = async function (email) {
  const user = await db.users.findOne({ where: { email } });
  return !!user;
};

const isPasswordMatch = async function (password, user) {
  const comp = bcrypt.compareSync(password, user.password);
  return comp;
};

const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  
  userBody.roleName = 'USER'

  return await db.users.create(userBody);
};

const createAdmin = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  userBody.password = bcrypt.hashSync(userBody.password, 8);
  userBody.roleName = 'SUPER_ADMIN'


  return db.users.create(userBody);
};

const internalGetUserById = async (id) => {
  return db.users.findOne({ where: { id } });
};

const getUserByEmail = async (email) => {
  return db.users.findOne({ where: { email } });
};

const setUserPassword = async (verifyToken, passwordBody) => {
  
    const decodedToken = jwt.verify(verifyToken, process.env.JWT_SECRET);

    if(!decodedToken || decodedToken.type != tokenTypes.SET_PASSWORD) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');

    const userId = decodedToken.sub;
    const userToUpdate = await internalGetUserById(userId);

    if (!userToUpdate) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    userToUpdate.password = bcrypt.hashSync(passwordBody.password, 8);

    await db.users.update(userToUpdate.dataValues, { where: { id: userId } });

    return userToUpdate;
};

module.exports = {
  createUser,
  createAdmin,
  setUserPassword,
  internalGetUserById,
  getUserByEmail,
  isPasswordMatch
};
