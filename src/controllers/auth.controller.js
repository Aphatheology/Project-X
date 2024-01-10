const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const register = catchAsync(async (req, res) => {
    const fullUser = await userService.createAdmin(req.body);

    const user = {
        id: fullUser.id,
        email: fullUser.email,
        fullName: fullUser.fullName,
        role: fullUser.roleName,
    };

    const accessToken = tokenService.generateToken(fullUser, tokenTypes.ACCESS);

    res.status(httpStatus.CREATED).send({ user, accessToken });
});

const login = catchAsync(async (req, res) => {
    const fullUser = await authService.loginUserWithEmailAndPassword(req.body);

    const user = {
        id: fullUser.id,
        email: fullUser.email,
        fullName: fullUser.fullName,
        role: fullUser.roleName,
    };

    if (user.role == 'SUPER_ADMIN') {
        user.companyName = fullUser.companyName;
    }

    const accessToken = tokenService.generateToken(fullUser, tokenTypes.ACCESS);

    res.send({ user, accessToken });
});

const setUserPassword = catchAsync(async (req, res) => {
    const fullUser = await userService.setUserPassword(
        req.query.token,
        req.body
    );

    const user = {
        id: fullUser.id,
        email: fullUser.email,
        fullName: fullUser.fullName,
        role: fullUser.roleName,
    };

    const accessToken = tokenService.generateToken(fullUser, tokenTypes.ACCESS);

    res.send({ user, accessToken });
});

module.exports = {
    register,
    login,
    setUserPassword,
};
