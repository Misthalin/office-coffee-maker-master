// Based on oblig 3 by Adrian
const mongoose = require("mongoose");

const coffeeBeanSchema = new mongoose.Schema({
  beanAdded: { type: Date, default: Date.now },

  typeOfBean: { type: String, required: true },

  brand: { type: String, requried: true },

  roastProfile: { type: String, required: true },

  roastType: { type: String, required: true },

  priceKg: { type: Number, required: true },

  origin: { type: String },
});

module.exports = mongoose.model("Bean", coffeeBeanSchema);
