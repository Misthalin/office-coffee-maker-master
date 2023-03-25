// Based on oblig 3 by Adrian
const mongoose = require("mongoose");
const LITRESOFWATER = [0.5, 1.1, 1.6, 2.2]

const coffeeBrewSchema = new mongoose.Schema({
  brewedAt: { type: Date, default: Date.now},

  brewName: { type: String, trim: true, required: true },

  typeOfBean: {  type: String, required: true, trim: true },

  gramsOfCoffee: { type: Number, required: true },

  grindingSettings: { type: Number, min: 1, max: 7, required: true },

  litersWater: { type: Number, enum: LITRESOFWATER },

  rating: { type: Number, default: 1, min: 0, max: 5 },

  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Brew", coffeeBrewSchema);
