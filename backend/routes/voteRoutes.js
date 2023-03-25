// Based on oblig 3 by Adrian
const express = require('express');
const router = express.Router();
const { getVotes, getMyVotes, getBrewVotes, setVote, updateVote} = require('../controllers/voteController');
const authorize = require('../_middleware/authorize');

router.route('/')
        .get(authorize(), getVotes)
        .post(authorize(), setVote)
        .put(authorize(), updateVote);

router.route('/my-votes')
        .get(authorize(), getMyVotes);

router.route('/brew-specific')
        .get(authorize(), getBrewVotes);

module.exports = router;