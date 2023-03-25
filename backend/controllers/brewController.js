// Inspired by Traversy Media at https://www.youtube.com/watch?v=-0exw-9YJBo / https://github.com/bradtraversy/mern-tutorial/tree/main/backend
// Based on oblig 3 by Adrian
const asyncHandler = require('express-async-handler');
const CoffeeBrew = require("../models/brewModel");

// @desc    Get brews
// @route   GET /api/brews
// @access  Private
const getBrews = asyncHandler(async (req, res) => {
  const brews = await CoffeeBrew.find();

  res.status(200).json(brews);
});

// @desc    Get brew
// @route   GET /api/brews/:id
// @access  Private
const getBrew = asyncHandler(async (req, res) => {
  const brew = await CoffeeBrew.findById(req.params.id);

  if (!brew) {
    res.status(400)
    throw new Error('Brew not found')
  };

  res.status(200).json(brew);
});

// @desc    Create brews
// @route   POST /api/brews
// @access  Private
const createBrew = asyncHandler(async (req, res) => {
  const { brewName, typeOfBean, gramsOfCoffee, grindingSettings, litersWater } = req.body;
  if (!brewName || !typeOfBean || !gramsOfCoffee || !grindingSettings || !litersWater) {
    res.status(400)
    throw new Error('Please add all fields')
  };

  const brew = await CoffeeBrew.create({ brewName, typeOfBean, gramsOfCoffee, grindingSettings, litersWater });

  res.status(200).json(brew);
});

// @desc    Update brew
// @route   PUT /api/brews/:id
// @access  Private
const updateBrew = asyncHandler(async (req, res) => {
  const brew = await CoffeeBrew.findById(req.params.id);

  if(!brew) {
      res.status(400)
      throw new Error('Brew not found')
  };

  const updatedBrew = await CoffeeBrew.findByIdAndUpdate(req.params.id, req.body, {new: true});

  res.status(200).json(updatedBrew);
});

// @desc    Delete brew
// @route   DELETE /api/brews/:id
// @access  Private
const deleteBrew = asyncHandler(async (req, res) => {
  const brew = await CoffeeBrew.findById(req.params.id);

  if(!brew) {
      res.status(400)
      throw new Error ('Brew not found')
  };

  await brew.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Get most freshly created brew
// @route   GET /api/brews/newest-brew
// @access  Private
const getMostRecentCoffee = asyncHandler(async (req, res) => {
  const coffee = await CoffeeBrew.find({}).sort({ brewedAt: -1 });

  if (!coffee) {
    res.status(400)
    throw new Error('Brew not found')
  }

  res.status(200).json(coffee);
});


module.exports = { getBrews, getBrew, createBrew, updateBrew, deleteBrew, getMostRecentCoffee };
