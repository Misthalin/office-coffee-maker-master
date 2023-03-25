// Inspired by Traversy Media at https://www.youtube.com/watch?v=-0exw-9YJBo / https://github.com/bradtraversy/mern-tutorial/tree/main/backend
// Based on oblig 3 by Adrian
const asyncHandler = require('express-async-handler');
const Vote = require('../models/voteModel');
const { updateBrewRating } = require('../_helpers/calculateRating');

// @desc    Get all votes
// @route   GET /api/votes
// @access  Private
const getVotes = asyncHandler(async (req, res) => {
    const votes = await Vote.find();

    res.status(200).json(votes);
});

// @desc    Get all user specific votes
// @route   GET /api/votes/my-votes
// @access  Private
const getMyVotes = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const votesByUser = await Vote.find({ userId });

    res.status(200).json(votesByUser);
})

// @desc    Get brew specific votes
// @route   GET /api/votes/specific-brew +brewId as query param
// @access  Private
const getBrewVotes = asyncHandler(async (req, res) => {
    const brewId = req.query.brewId;
    const votesByBrewId = await Vote.find({ brewId });

    res.status(200).json(votesByBrewId);
})

// @desc    Set vote
// @route   POST /api/votes
// @access  Private
const setVote = asyncHandler(async (req, res) => {
    const { brewId, userId, value } = req.body;
    const ratedBefore = await Vote.find({ brewId, userId }).count();

    if (ratedBefore) {
        res.status(409)
        throw new Error('User has already voted for this brew')
    }

    if (!brewId || !value || !userId) {
        res.status(400)
        throw new Error('Please add all fields')
    };

    const vote = await Vote.create({ brewId, userId, value });

    updateBrewRating(brewId);
    
    res.status(200).json(vote);
})

// @desc    Update vote
// @route   PUT /api/votes
// @access  Private
const updateVote = asyncHandler(async (req, res) => {
    const { brewId, userId } = req.body;
    const vote = await Vote.find({ brewId, userId });

    if (!vote) {
        res.status(400)
        throw new Error('Vote not found')
    };

    const updatedVote = await Vote.findOneAndUpdate({ brewId, userId }, req.body, { new: true });

    updateBrewRating(brewId);

    res.status(200).json(updatedVote);
});


module.exports = { getVotes, getMyVotes, getBrewVotes, setVote, updateVote };