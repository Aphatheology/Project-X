const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

const sendEmail = async (to, subject, text) => {
    const msg = { from: config.email.from, to, subject, text };
    await transport.sendMail(msg);
};

const sendSetPasswordEmail = async (to, token, fullName) => {
    const subject = 'Email Verification';

    const setPasswordEmailUrl = `${config.appUrl}/auth/set-password?token=${token}`;

    const text = `Dear ${fullName},
An account had been created for you on Project X by the Admin.
To set your password, click on this link: ${setPasswordEmailUrl}
If you did not know about Project X, then ignore this email.`;

    logger.info(setPasswordEmailUrl);
    
    await sendEmail(to, subject, text);
};

module.exports = {
    transport,
    sendEmail,
    sendSetPasswordEmail,
};
