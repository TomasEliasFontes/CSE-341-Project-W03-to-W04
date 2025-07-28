// server.js
const express       = require('express');
const swaggerUi     = require('swagger-ui-express');
const swaggerDoc    = require('./swagger.json');
const connectDB     = require('./data/database');
const requireAuth   = require('./middleware/auth');
const User = require('./models/user');

const session  = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Conect to MongoDB 
require('dotenv').config();

const app           = express();
const port          = process.env.PORT || 3000;

connectDB()
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware for password
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Strategie for google 
passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Aquí buscas o creas usuario en DB usando profile.id
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({ googleId: profile.id, email: profile.emails[0].value });
  }
  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//Middleware for JSON
app.use(express.json());
app.use('/auth', require('./routes/auth'));

//Mount the routers
app.use('/movies',  requireAuth, require('./routes/movies'));
app.use('/reviews', requireAuth, require('./routes/reviews'));

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
