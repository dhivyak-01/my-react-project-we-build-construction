const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');  // Native Node module to interact with the file system
const path = require('path');
const Carousel = require('../models/Carousel');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path to store the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});
const upload = multer({ storage });

// 1. Create a new carousel
router.post('/', async (req, res) => {
  try {
    const { id, name, isEnabled } = req.body;
    const newCarousel = new Carousel({ id, name, isEnabled });
    await newCarousel.save();
    res.status(201).json(newCarousel);
  } catch (error) {
    console.error('Error creating carousel:', error);
    res.status(500).json({ message: 'Error creating carousel' });
  }
});

// 2. Get all carousels
router.get('/', async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.json(carousels);
  } catch (error) {
    console.error('Error fetching carousels:', error);
    res.status(500).json({ message: 'Error fetching carousels' });
  }
});

// 3. Add an item to an existing carousel
router.post('/items', upload.single('image'), async (req, res) => {
  try {
    const { carouselId, icon, heading, caption, status } = req.body;
    const imagePath = req.file ? req.file.path : '';

    const carousel = await Carousel.findOne({ id: carouselId });
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }

    // Determine if the item should be enabled
    const isEnabled = status === 'enabled'; 

    // Push the new item with isEnabled instead of status
    carousel.items.push({ icon, heading, caption, imagePath, isEnabled });
    await carousel.save();
    res.status(201).json(carousel);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item' });
  }
});

// 4. Get a specific carousel by ID
router.get('/:id', async (req, res) => {
  try {
    const carousel = await Carousel.findOne({ id: req.params.id });
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }
    res.json(carousel);
  } catch (error) {
    console.error('Error fetching carousel:', error);
    res.status(500).json({ message: 'Error fetching carousel' });
  }
});

// 5. Update carousel data
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isEnabled } = req.body;

    const updatedCarousel = await Carousel.findByIdAndUpdate(
      id,
      { name, isEnabled },
      { new: true }
    );

    if (!updatedCarousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }

    res.status(200).json(updatedCarousel);
  } catch (error) {
    console.error('Error updating carousel:', error);
    res.status(500).json({ message: 'Error updating carousel' });
  }
});


// Helper function to delete an image file
const deleteImage = (imagePath) => {
  const fullPath = path.resolve(imagePath);  // Make sure the path is absolute
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);  // Delete the file
  } else {
    console.log(`Image not found: ${imagePath}`);
  }
};

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`DELETE request received for ID: ${id}`); // Log the ID to the console

    // Try to find and delete the carousel from the DB using Mongoose
    const deletedCarousel = await Carousel.findByIdAndDelete(id);

    if (!deletedCarousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Carousel deleted successfully' });
  } catch (error) {
    console.error('Error deleting carousel:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



router.delete('/items/:itemId', async (req, res) => {
  try {
    const { carouselId } = req.body;  // carouselId from the request body
    const { itemId } = req.params;    // itemId from the request URL params

    console.log("Received carouselId:", carouselId);  // Log for debugging
    console.log("Received itemId:", itemId);          // Log for debugging

    // Check if both IDs are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(carouselId)) {
      return res.status(400).json({ message: 'Invalid carouselId format' });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid itemId format' });
    }

    // Proceed with deletion logic...
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


module.exports = router;

