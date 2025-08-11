const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, sparse: true },
  linkedinId: { type: String, sparse: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: String,
  linkedinAccessToken: String,
  linkedinRefreshToken: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
