// models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  releaseYear: Number,
  genre: String,
  synopsis: String,
  duration: Number,
  rating: Number
});

module.exports = mongoose.model('Movie', movieSchema);
