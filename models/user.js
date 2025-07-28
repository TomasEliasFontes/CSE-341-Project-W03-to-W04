// models/user.js
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema({
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Enter a valid email']
  },
  password: {
    type: String,
    required: true
  }
});

// Before save, hashe the password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare the passwords
userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
