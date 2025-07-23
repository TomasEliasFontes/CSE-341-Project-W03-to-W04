// models/reviews.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  reviewer: String,
  rating: Number,
  comment: String,
  date: Date
});
module.exports = mongoose.model('Review', reviewSchema);