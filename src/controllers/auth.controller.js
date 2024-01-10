const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const register = catchAsync(async (req, res) => {
    const user = await userService.createAdmin(req.body);
    delete user.password;
    const accessToken = tokenService.generateToken(user, tokenTypes.ACCESS);
    res.status(httpStatus.CREATED).send({ user, accessToken });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
    );

    delete user.password;
    delete user.companyName;

    const accessToken = tokenService.generateToken(user, tokenTypes.ACCESS);

    res.send({ user, accessToken });
});

const setUserPassword = catchAsync(async (req, res) => {
    const user = await userService.setUserPassword(req.query.token, req.body);

    const accessToken = tokenService.generateToken(user, tokenTypes.ACCESS);

    res.send({ user, accessToken });
});

module.exports = {
    register,
    login,
    setUserPassword,
};
