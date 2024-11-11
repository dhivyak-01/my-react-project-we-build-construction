const express = require('express');
const multer = require('multer');
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
    const isEnabled = status === 'enabled'; // This remains the same

    console.log('Status received:', status);
    console.log('isEnabled:', isEnabled);

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




router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Get the ID from the URL
    const { name, isEnabled } = req.body;  // Get the data from the request body

    // Find the carousel by ID and update it
    const updatedCarousel = await Carousel.findByIdAndUpdate(
      id, 
      { name, isEnabled },
      { new: true }  // The `new: true` option returns the updated document
    );

    if (!updatedCarousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }

    // Return the updated carousel
    res.status(200).json(updatedCarousel);
  } catch (error) {
    console.error('Error updating carousel:', error);
    res.status(500).json({ message: 'Error updating carousel' });
  }
});

// DELETE /api/carousels/:id - Delete a carousel
router.delete("/carousels/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the carousel by its ID and delete it
    const deletedCarousel = await Carousel.findByIdAndDelete(id);

    if (!deletedCarousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    res.status(200).json({ message: "Carousel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete carousel" });
  }
});

// DELETE /api/carousels - Delete multiple carousels
router.delete("/carousels", async (req, res) => {
  const { ids } = req.body; // Expecting an array of carousel IDs

  try {
    // Delete all carousels that match the provided IDs
    const deletedCarousels = await Carousel.deleteMany({ _id: { $in: ids } });

    if (deletedCarousels.deletedCount === 0) {
      return res.status(404).json({ message: "No carousels found to delete" });
    }

    res.status(200).json({ message: "Carousels deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete carousels" });
  }
});








module.exports = router;
