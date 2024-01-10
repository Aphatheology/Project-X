const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, emailService, tokenService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);

    const verifyToken = tokenService.generateToken(
        user,
        tokenTypes.SET_PASSWORD
    );

    await emailService.sendSetPasswordEmail(
        user.dataValues.email,
        verifyToken,
        user.dataValues.fullName
    );

    res.status(httpStatus.CREATED).send({
        message: 'User created successfully, they will receive an email to set their password',
        user,
    });
});

module.exports = {
    createUser,
};
