const mongoose = require('mongoose');

const carouselItemSchema = new mongoose.Schema({
  image: { type: String, required: true },
  icon: { type: String, required: true },
  heading: { type: String, required: true },
  caption: { type: String, required: true },
});

module.exports = mongoose.model('CarouselItem', carouselItemSchema);
