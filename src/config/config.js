const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        DB_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN_MINUTES: Joi.string().required(),
        NODE_ENV: Joi.string().valid('production', 'development').required(),
        PORT: Joi.string().default(3000),
        SMTP_HOST: Joi.string()
            .description('server that will send the emails')
            .required(),
        SMTP_PORT: Joi.number()
            .description('port to connect to the email server')
            .required(),
        SMTP_USERNAME: Joi.string()
            .description('username for email server')
            .required(),
        SMTP_PASSWORD: Joi.string()
            .description('password for email server')
            .required(),
        EMAIL_FROM: Joi.string()
            .description('the from field in the emails sent by the app')
            .required(),
        APP_URL: Joi.string()
            .description('url that will be in mails')
            .required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    sequelize: {
        url: envVars.DB_URL,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        expireInMinute: envVars.JWT_EXPIRES_IN_MINUTES,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    appUrl: envVars.APP_URL,
};
