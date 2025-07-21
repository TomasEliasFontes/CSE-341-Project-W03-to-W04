// server.js
const express = require('express');
const app = express();
const connectDB = require('./data/database');
const moviesRoutes = require('./routes/movies');
const reviewsRoutes = require('./routes/reviews');

require('dotenv').config();
connectDB();

app.use(express.json());

app.use('/movies', moviesRoutes);
app.use('/reviews', reviewsRoutes);

// Swagger (opcional por ahora)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
