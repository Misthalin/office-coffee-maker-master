// Based on oblig 3 by Adrian
const mongoose = require('mongoose');
const RATING_NUMBERS = [1, 2, 3, 4, 5];

const voteSchema = mongoose.Schema({
    brewId: { type: String, required: true },

    userId: { type: String, required: true },

    value: { type: Number, enum: RATING_NUMBERS },

    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Vote', voteSchema);