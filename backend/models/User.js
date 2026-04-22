const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
