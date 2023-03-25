// Inspired by https://github.com/cornflourblue/node-mongo-signup-verification-api
// https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password?fbclid=IwAR0yeIBCrrSZg3Avi7FwkRjAdJVG6Ds4Hf1vfYRTtSa-88L9U4MYDs0qSHc

const config = require('config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('models/userModel'),
    RefreshToken: require('models/refreshTokenModel'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}