// Based on oblig 3 by Adrian
const express = require('express');
const router = express.Router();
const { getBrews, getBrew, createBrew, updateBrew, deleteBrew, getMostRecentCoffee } = require('../controllers/brewController');
const authorize = require('../_middleware/authorize');
const Role = require('../_helpers/role');

router.route('/newest-brew')
        .get(getMostRecentCoffee);

router.route('/')
        .get(authorize(), getBrews)
        .post(authorize(), createBrew);

router.route('/:id')
        .get(authorize(), getBrew)
        .put(authorize(), updateBrew)
        .delete(authorize(Role.Admin), deleteBrew);

module.exports = router;
            
