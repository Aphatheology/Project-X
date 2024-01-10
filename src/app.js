const express = require('express');
const httpStatus = require('http-status');
const passport = require('passport');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { db } = require('./models');
const logger = require('./config/logger');

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// api routes
app.use('/api', routes);

// send back a 404 error for any unknown api route request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// start and seed DB
db.sequelize.sync().then(async () => {
    const rolesSeedData = [
        { name: 'USER', description: 'Basic user' },
        { name: 'SUPER_ADMIN', description: 'Business owner' },
    ];

    const rolesInstances = [];
    for (const role of rolesSeedData) {
        const [instance, created] = await db.roles.findOrCreate({
            where: { name: role.name },
            defaults: role,
        });
        rolesInstances.push(instance);
    }

    const permissionsSeedData = [
        { name: 'CREATE_USER', description: 'Permission to create a user' },
        { name: 'UPDATE_USER', description: 'Permission to update a user' },
        { name: 'DELETE_USER', description: 'Permission to delete a user' },
    ];

    const permissionsInstances = [];
    for (const permission of permissionsSeedData) {
        const [instance, created] = await db.permissions.findOrCreate({
            where: { name: permission.name },
            defaults: permission,
        });
        permissionsInstances.push(instance);
    }

    await rolesInstances[1].addPermissions(permissionsInstances);
    await rolesInstances[0].addPermissions(permissionsInstances[1]);

    logger.info('Database synced and seeded with roles and permissions.');
});

module.exports = app;
