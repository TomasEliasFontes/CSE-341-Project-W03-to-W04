// swagger.js
const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');   

const doc = {
  info: {
    title: 'Movie & Review API',
    description: 'CRUD API for movies and reviews'
  },
  host: 'localhost:3000',
  schemes: ['https'],
  definitions: {
    Movie: {
      _id:      '507f1f77bcf86cd799439011',
      title:    'Inception',
      director: 'Christopher Nolan',
      releaseYear: 2010,
      genre:    'Sci-Fi',
      synopsis: 'A thief steals corporate secrets…',
      duration: 148,
      rating:   8.8
    },
    Review: {
      _id:      '507f1f77bcf86cd799439012',
      movieId:  '507f1f77bcf86cd799439011',
      reviewer: 'Laura',
      rating:   5,
      comment:  'Great movie!',
      date:     '2025-07-21T12:34:56.789Z'
    }
  }
};

// Include server.js for the prefije
const outputFile     = './swagger.json';
const endpointsFiles = [
  './server.js',
  './routes/movies.js',
  './routes/reviews.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    // Delete the auto gen emptys
    const swagger = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    delete swagger.paths['/'];
    delete swagger.paths['/{id}'];
    fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));

    console.log('✅ swagger.json generado');
  });
