const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

const auth =
    (...requiredPermissions) =>
    async (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('jwt', async function (err, user, info) {
                if (err || info || !user)
                    return reject(
                        new ApiError(
                            httpStatus.UNAUTHORIZED,
                            'Please authenticate'
                        )
                    );

                req.user = user;
                if (requiredPermissions.length) {
                    const { roleName } = req.user;
                    const permissionRecords = await db.rolePermissions.findAll({
                        where: { roleName },
                        attributes: ['permissionName'],
                    });

                    const userPermissions = permissionRecords.map(
                        (record) => record.permissionName
                    );

                    const hasRequiredPermission = requiredPermissions.some(
                        (permission) => userPermissions.includes(permission)
                    );

                    if (!hasRequiredPermission) {
                        return reject(
                            new ApiError(
                                httpStatus.FORBIDDEN,
                                'You do not have the required permissions'
                            )
                        );
                    }
                }

                next();
            })(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };

module.exports = auth;
