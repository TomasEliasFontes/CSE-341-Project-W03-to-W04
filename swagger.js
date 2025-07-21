// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie & Review API',
    description: 'API CRUD para películas y reseñas'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Movie: {
      _id:      '507f1f77bcf86cd799439011',
      title:    'Inception',
      director: 'Christopher Nolan',
      releaseYear: 2010,
      genre:    'Sci-Fi',
      synopsis: 'Un ladrón roba secretos corporativos…',
      duration: 148,
      rating:   8.8
    },
    Review: {
      _id:      '507f1f77bcf86cd799439012',
      movieId:  '507f1f77bcf86cd799439011',
      reviewer: 'Laura',
      rating:   5,
      comment:  'Excelente película',
      date:     '2025-07-21T12:34:56.789Z'
    }
  }
};

const outputFile     = './swagger.json';
const endpointsFiles = ['./routes/movies.js', './routes/reviews.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('✅ swagger.json generado');
  });
