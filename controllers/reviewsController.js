// controllers/reviewsController.js
const Review = require('../models/reviews');
const mongoose = require('mongoose');

exports.getAllReviews = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Retrieve all reviews'
     #swagger.responses[200] = {
       description: 'Array of review objects',
       schema: [{ $ref: '#/definitions/Review' }]
     }
  */
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Retrieve a single review by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Review ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Review object',
       schema: { $ref: '#/definitions/Review' }
     }
     #swagger.responses[404] = { description: 'Review not found' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving review', error: err.message });
  }
};

exports.createReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Create a new review'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Review data',
       required: true,
       schema: { $ref: '#/definitions/Review' }
     }
     #swagger.responses[201] = {
       description: 'Review created',
       schema: { $ref: '#/definitions/Review' }
     }
     #swagger.responses[400] = { description: 'Validation error' }
  */
  try {
    const review = new Review(req.body);
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create review', error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Update an existing review'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Review ID to update',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Fields to update',
       required: true,
       schema: { $ref: '#/definitions/Review' }
     }
     #swagger.responses[200] = {
       description: 'Updated review object',
       schema: { $ref: '#/definitions/Review' }
     }
     #swagger.responses[404] = { description: 'Review not found' }
     #swagger.responses[400] = { description: 'Invalid ID or validation error' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }
  try {
    const updated = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update review', error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  /* #swagger.tags = ['Reviews']
     #swagger.summary = 'Delete a review by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Review ID to delete',
       required: true,
       type: 'string'
     }
     #swagger.responses[204] = { description: 'Review deleted' }
     #swagger.responses[404] = { description: 'Review not found' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }
  try {
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};
