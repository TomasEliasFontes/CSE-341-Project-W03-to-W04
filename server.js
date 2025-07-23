// server.js
const express       = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerDoc    = require('./swagger.json');
const connectDB     = require('./data/database');

const app           = express();
const port          = process.env.PORT || 3000;

// Conect to MongoDB 
require('dotenv').config();
connectDB()
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

//Middleware for JSON
app.use(express.json());

//Mount the routers
app.use('/movies',  require('./routes/movies'));
app.use('/reviews', require('./routes/reviews'));

//Use of Swagger UI routes in the /api-docs
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
);

//Route o check list
/* #swagger.ignore = true */
app.get('/', (_req, res) => {
  res.send('🎬 Movie & Review API is running');
});

//Run Server
app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
