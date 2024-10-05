const mongoose = require('mongoose');

const callbackRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  callbackDate: { type: Date, required: true },
  callbackTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CallbackRequest', callbackRequestSchema);
