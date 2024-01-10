const Sequelize = require('sequelize');
const { sequelize } = require('./config');
const logger = require('./logger');

const sequelizeInstance = new Sequelize(sequelize.url);

sequelizeInstance
    .authenticate()
    .then(() => logger.info('DB connected'))
    .catch((err) => {
        logger.error(err);
    });

module.exports = {
    sequelizeInstance,
};
