// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie API',
    description: 'CRUD API for Movies and Reviews'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/movies.js', './routes/reviews.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
