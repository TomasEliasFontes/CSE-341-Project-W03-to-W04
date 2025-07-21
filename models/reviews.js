// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  reviewer: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
