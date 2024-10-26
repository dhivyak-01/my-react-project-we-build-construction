const express = require('express');
const router = express.Router();
const multer = require('multer');
const CarouselItem = require('../models/CarouselItem');

const upload = multer({ dest: 'uploads/' }); // Specify your upload directory

// Get all carousel items
router.get('/', async (req, res) => {
  try {
    const items = await CarouselItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new carousel item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newItem = new CarouselItem({
      image: req.file ? req.file.path : null,
      icon: req.body.icon,
      heading: req.body.heading,
      caption: req.body.caption,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(400).json({ message: "Error creating item" });
  }
});

// Update a carousel item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      icon: req.body.icon,
      heading: req.body.heading,
      caption: req.body.caption,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const item = await CarouselItem.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(400).json({ message: "Error updating item" });
  }
});

// Delete a carousel item
router.delete('/:id', async (req, res) => {
  try {
    const item = await CarouselItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;










// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const CarouselItem = require('../models/CarouselItem');


// const upload = multer({ dest: 'uploads/' }); // Specify your upload directory

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const newItem = new CarouselItem({
//       image: req.file.path, // Store the path to the uploaded file
//       icon: req.body.icon,
//       heading: req.body.heading,
//       caption: req.body.caption,
//     });
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating item" });
//   }
// });


// // Get all carousel items
// router.get('/', async (req, res) => {
//   console.log("Fetching carousel items...");
//   try {
//     const items = await CarouselItem.find();
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Add a new carousel item
// router.post('/', async (req, res) => {
//   console.log("Request body:", req.body); // Log incoming data
//   try {
//     const newItem = new CarouselItem(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     console.error("Error creating item:", error); // Log the error
//     res.status(400).json({ message: "Error creating item" });
//   }
// });

// // Delete a carousel item
// router.delete('/:id', async (req, res) => {
//   try {
//     await CarouselItem.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(404).json({ message: "Item not found" });
//   }
// });

// module.exports = router;
