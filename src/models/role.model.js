module.exports = (sequelize, dataType) => {
    const role = sequelize.define('role', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataType.STRING,
            allowNull: false,
            unique: true,
            trim: true,
            primaryKey: true,
        },
        description: {
            type: dataType.STRING,
            allowNull: false,
            trim: true,
        },
    });

    return role;
};
