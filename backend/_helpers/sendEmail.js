// Inspired by https://github.com/cornflourblue/node-mongo-signup-verification-api
// https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password?fbclid=IwAR0yeIBCrrSZg3Avi7FwkRjAdJVG6Ds4Hf1vfYRTtSa-88L9U4MYDs0qSHc
// License in readme.md
const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}