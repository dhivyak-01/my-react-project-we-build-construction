const mongoose = require('mongoose');

const carouselItemSchema = new mongoose.Schema({
  icon: String,
  heading: String,
  caption: String,
  imagePath: String,
});

const carouselSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  isEnabled: { type: Boolean, default: true },
  items: [carouselItemSchema],
});

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;
