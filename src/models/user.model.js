const validator = require('validator');

module.exports = (sequelize, dataType) => {
    const user = sequelize.define('user', {
        id: {
            type: dataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        fullName: {
            type: dataType.STRING,
            allowNull: false,
            trim: true,
        },
        companyName: {
            type: dataType.STRING,
            allowNull: true,
            trim: true,
        },
        email: {
            type: dataType.STRING,
            allowNull: false,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: dataType.STRING,
            allowNull: true,
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error(
                        'Password must contain at least one letter and one number'
                    );
                }
            },
        },
    });

    return user;
};
