const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../config/db.connect');

const db = {};

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.roles = require('./role.model')(sequelizeInstance, Sequelize);
db.permissions = require('./permission.model')(sequelizeInstance, Sequelize);
db.rolePermissions = require('./rolepermission.model')(sequelizeInstance, Sequelize);

db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

db.roles.belongsToMany(db.permissions, { through: db.rolePermissions });
db.permissions.belongsToMany(db.roles, { through: db.rolePermissions });

module.exports = {
  db,
};
