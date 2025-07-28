// routes/auth.js
const express      = require('express');
const jwt          = require('jsonwebtoken');
const User         = require('../models/user');
const router       = express.Router();
const passport     = require('passport');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /auth/logout
// For JWT normaly is the “logout” that make delete the token of the client
router.get('/logout', (_req, res) => {
  res.json({ message: 'Client should discard the token' });
});

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }) );
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Éxito, redirige o envía token
    res.redirect('/protected');
  }
);

module.exports = router;
