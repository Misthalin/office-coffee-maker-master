// Inspired by https://github.com/cornflourblue/node-mongo-signup-verification-api
// https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password?fbclid=IwAR0yeIBCrrSZg3Avi7FwkRjAdJVG6Ds4Hf1vfYRTtSa-88L9U4MYDs0qSHc
// License in readme.md
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },

    passwordHash: { type: String, required: true },

    username: { type: String, required: true },

    acceptTerms: Boolean,

    role: { type: String, required: true },

    verificationToken: String,

    verified: Date,

    resetToken: { token: String, expires: Date },

    passwordReset: Date,

    created: { type: Date, default: Date.now },

    updated: Date
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Account', schema);