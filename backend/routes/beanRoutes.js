// Based on oblig 3 by Adrian
const express = require('express');
const router = express.Router();
const { getBeans, getBean, postBean, updateBean, deleteBean } = require('../controllers/beanController');
const authorize = require("../_middleware/authorize");
const Role = require('../_helpers/role');

router.route('/')
        .get(authorize(), getBeans)
        .post(authorize(Role.Admin), postBean);

router.route('/:id')
        .get(authorize(Role.Admin), getBean)
        .delete(authorize(Role.Admin), deleteBean)
        .put(authorize(Role.Admin), updateBean);

module.exports = router;