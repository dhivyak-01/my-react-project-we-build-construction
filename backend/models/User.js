const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  dob: String,
  gender: String,
  email: String,
  phoneno: String,
  city: String,
  avatar: String,
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);