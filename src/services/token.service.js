const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

const generateToken = (user, type) => {
  const { expireInMinute, secret } = config.jwt;

  const payload = {
    sub: user.id,
    role: user.roleName,
    type,
    iat: moment().unix(),
    exp: moment().add(expireInMinute, 'minutes').unix(),
  };

  return jwt.sign(payload, secret);
};

module.exports = {
  generateToken,
};
