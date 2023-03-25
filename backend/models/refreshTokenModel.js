// Inspired by https://github.com/cornflourblue/node-mongo-signup-verification-api
// https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password?fbclid=IwAR0yeIBCrrSZg3Avi7FwkRjAdJVG6Ds4Hf1vfYRTtSa-88L9U4MYDs0qSHc
// License in readme.md
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'Account' },

    token: String,

    expires: Date,

    created: { type: Date, default: Date.now },

    createdByIp: String,

    revoked: Date,

    revokedByIp: String,

    replacedByToken: String
});

schema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

module.exports = mongoose.model('RefreshToken', schema);