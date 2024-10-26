const express = require('express');
const multer = require('multer');
const Carousel = require('../models/CarouselList');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all carousels
router.get('/', async (req, res) => {
  const carousels = await Carousel.find();
  res.json(carousels);
});

// Create a new carousel
router.post('/', async (req, res) => {
  const newCarousel = new Carousel(req.body);
  await newCarousel.save();
  res.status(201).json(newCarousel);
});

// Update an existing carousel
router.put('/:id', async (req, res) => {
  const carousel = await Carousel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!carousel) {
    return res.status(404).send('Carousel not found');
  }
  res.json(carousel);
});

// Add an item to a carousel
router.post('/:id/items', upload.single('image'), async (req, res) => {
  const carouselId = req.params.id;

  const newItem = {
    icon: req.body.icon,
    heading: req.body.heading,
    caption: req.body.caption,
    imagePath: req.file ? `uploads/${req.file.filename}` : null,
  };

  const carousel = await Carousel.findOne({ id: carouselId });
  if (!carousel) {
    return res.status(404).send('Carousel not found');
  }

  carousel.items.push(newItem);
  await carousel.save();
  res.status(201).json(newItem);
});

// Get items for a specific carousel
router.get('/:id/items', async (req, res) => {
  const carousel = await Carousel.findOne({ id: req.params.id });
  if (!carousel) {
    return res.status(404).send('Carousel not found');
  }
  res.json(carousel.items);
});

// Get carousel by ID
router.get('/:id', async (req, res) => {
  try {
    const carousel = await Carousel.findOne({ id: req.params.id });
    if (!carousel) {
      return res.status(404).send('Carousel not found');
    }
    res.json(carousel);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
