module.exports = (sequelize, dataType) => {
    const rolePermission = sequelize.define('rolePermission', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        roleName: {
            type: dataType.STRING,
            allowNull: false,
            trim: true,
        },
        permissionName: {
            type: dataType.STRING,
            allowNull: false,
            trim: true,
        },
    });

    return rolePermission;
};
