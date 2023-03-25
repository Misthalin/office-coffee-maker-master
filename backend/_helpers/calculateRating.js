const asyncHandler = require('express-async-handler');
const Vote = require('../models/voteModel');
const CoffeeBrew = require("../models/brewModel");

const updateBrewRating = asyncHandler(async (brewId) => {
    const vote = await Vote.find({ brewId: brewId });
    const brew = await CoffeeBrew.findById(brewId);

    if (!brew) {
        res.status(400)
        throw new Error('Brew not found')
    };

    if (!vote) {
        res.status(400)
        throw new Error('Vote not found')
    };

    // Calculates average of all vote values related to brew id
    try {
        Vote.aggregate([{
            $match: { brewId: brewId }, // find all brews with matching brewId
        }, {
            $group: {
                _id: null,
                average: {  // calculate average based on "value" : Number
                    $avg: "$value"
                },
                count: {
                    $count: {}
                }
            }
        }]).exec(async (err, results) => {
            rating = results[0].average; // result of calculated average
            votes = results[0].count;
        
            await CoffeeBrew.findByIdAndUpdate(brewId, { rating, votes }, { new: true }); // set new average score as rating on brew
        });
    } catch(err) {
        console.log(err);
    }
})

module.exports = { updateBrewRating }