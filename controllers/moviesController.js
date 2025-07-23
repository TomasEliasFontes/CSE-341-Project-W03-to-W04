// controllers/moviesController.js
const Movie = require('../models/movie');
const mongoose = require('mongoose');

exports.getAllMovies = async (req, res) => {
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Retrieve all movies'
     #swagger.responses[200] = {
       description: 'Array of movie objects',
       schema: [{ $ref: '#/definitions/Movie' }]
     }
  */
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movies', error: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Retrieve a single movie by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Movie ID',
       required: true,
       type: 'string'
     }
     #swagger.responses[200] = {
       description: 'Movie object',
       schema: { $ref: '#/definitions/Movie' }
     }
     #swagger.responses[404] = { description: 'Movie not found' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movie', error: err.message });
  }
};

exports.createMovie = async (req, res) => {
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Create a new movie'
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Movie data',
       required: true,
       schema: { $ref: '#/definitions/Movie' }
     }
     #swagger.responses[201] = {
       description: 'Movie created',
       schema: { $ref: '#/definitions/Movie' }
     }
     #swagger.responses[400] = { description: 'Validation error' }
  */
  try {
    const movie = new Movie(req.body);
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create movie', error: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Update an existing movie'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Movie ID to update',
       required: true,
       type: 'string'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       description: 'Fields to update',
       required: true,
       schema: { $ref: '#/definitions/Movie' }
     }
     #swagger.responses[200] = {
       description: 'Updated movie object',
       schema: { $ref: '#/definitions/Movie' }
     }
     #swagger.responses[404] = { description: 'Movie not found' }
     #swagger.responses[400] = { description: 'Invalid ID or validation error' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }
  try {
    const updated = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update movie', error: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  /* #swagger.tags = ['Movies']
     #swagger.summary = 'Delete a movie by ID'
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'Movie ID to delete',
       required: true,
       type: 'string'
     }
     #swagger.responses[204] = { description: 'Movie deleted' }
     #swagger.responses[404] = { description: 'Movie not found' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
  */
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }
  try {
    const deleted = await Movie.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete movie', error: err.message });
  }
};
