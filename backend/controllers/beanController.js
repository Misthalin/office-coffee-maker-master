// Inspired by Traversy Media at https://www.youtube.com/watch?v=-0exw-9YJBo / https://github.com/bradtraversy/mern-tutorial/tree/main/backend
// Based on oblig 3 by Adrian
const asyncHandler = require('express-async-handler');
const Bean = require('../models/beanModel');

// @desc    Get beans
// @route   GET /api/beans
// @access  Private
const getBeans = asyncHandler(async (req, res) => {
    const beans = await Bean.find();

    res.status(200).json(beans);
});

// @desc    Get bean
// @route   GET /api/beans/:id
// @access  Private
const getBean = asyncHandler(async (req, res) => {
    const bean = await Bean.findById(req.params.id);

    if(!bean) {
        res.status(400)
        throw new Error('Bean not found')
    };

    res.status(200).json(bean);
});

// @desc    Post bean
// @route   POST /api/beans
// @access  Private
const postBean = asyncHandler(async (req, res) => {
    const { typeOfBean, brand, roastProfile, roastType, priceKg, origin } = req.body;

    if( !typeOfBean || !brand || !roastProfile || !roastType || !priceKg || !origin) {
        res.status(400)
        throw new Error('Please add all fields')
    };

    const bean = await Bean.create({ typeOfBean, brand, roastProfile, roastType, priceKg, origin });

    res.status(200).json(bean);
});

// @desc    Update bean
// @route   PUT /api/beans/:id
// @access  Private
const updateBean = asyncHandler(async (req, res) => {
    const bean = await Bean.findById(req.params.id);

    if(!bean) {
        res.status(400)
        throw new Error('Bean not found')
    };

    const updatedBean = await Bean.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedBean);
});

// @desc    Delete bean
// @route   DELETE /api/beans/:id
// @access  Private
const deleteBean = asyncHandler(async (req, res) => {
    const bean = await Bean.findById(req.params.id);
    if(!bean) {
        res.status(400)
        throw new Error ('Bean not found')
    };

    await bean.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = { getBean, getBeans, postBean, updateBean, deleteBean };