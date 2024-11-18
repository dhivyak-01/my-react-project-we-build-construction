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
  const { id } = req.params;

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Perform the query using the valid ObjectId
    const carousel = await Carousel.findById(id);

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


// 6. Helper function to delete an image file
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

// 7. Delete a specific item from a carousel
router.delete('/:carouselId/items/:itemId', async (req, res) => {
  const { carouselId, itemId } = req.params;

  try {
    // Find the carousel by its ID
    const carousel = await Carousel.findById(carouselId);

    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }

    // Find the item index within the carousel's items array
    const itemIndex = carousel.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in this carousel' });
    }

    // Remove the item from the array
    carousel.items.splice(itemIndex, 1);

    // Save the updated carousel
    await carousel.save();

    res.json({ message: 'Item deleted successfully' });

  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});

// 8. PUT route for updating a carousel from edit
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isEnabled } = req.body;

    console.log('Received data:', { id, name, isEnabled });
    console.log('isEnabled type:', typeof isEnabled); // This should log boolean, not string

    // Ensure isEnabled is a boolean
    let isEnabledBoolean;
    if (typeof isEnabled === 'string') {
      if (isEnabled === 'enabled') {
        isEnabledBoolean = true;
      } else if (isEnabled === 'disabled') {
        isEnabledBoolean = false;
      } else {
        return res.status(400).json({ message: 'Invalid value for isEnabled. It must be "enabled" or "disabled".' });
      }
    } else {
      isEnabledBoolean = isEnabled; // It should already be a boolean if sent correctly
    }

    console.log('Converted isEnabled:', isEnabledBoolean); // Check that it is boolean

    // Update the carousel with the correct boolean value for isEnabled
    const updatedCarousel = await Carousel.findByIdAndUpdate(
      id,
      { name, isEnabled: isEnabledBoolean },
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



// 9. Update an existing carousel item
router.put('/:carouselId/items/:itemId', upload.single('image'), (req, res) => {
  const { carouselId, itemId } = req.params;  // Extract carouselId and itemId from URL
  const { icon, heading, caption, status } = req.body;  // Extract text fields from the body

  const image = req.file ? req.file.filename : null;  // Handle image if uploaded

  // Log the received data for debugging
  console.log("Received data:", req.body);
  console.log("Received image:", req.file);

  Carousel.findById(carouselId)  // Find the carousel by ID
    .then(carousel => {
      if (!carousel) {
        return res.status(404).json({ message: 'Carousel not found' });
      }

      const item = carousel.items.id(itemId);  // Find the item by its ID
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      // Update the item's fields
      item.icon = icon;
      item.heading = heading;
      item.caption = caption;
      item.status = status;

      // If an image was uploaded, update the image path
      if (image) {
        // Save the path relative to the public folder for serving
        item.imagePath = `uploads/${image}`;
      }

      // Save the updated carousel
      return carousel.save();
    })
    .then(updatedCarousel => {
      res.json(updatedCarousel);  // Respond with the updated carousel
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
});










module.exports = router;

