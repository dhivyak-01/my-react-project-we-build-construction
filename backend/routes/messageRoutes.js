const express = require('express');
// const Message = require('../models/Message');
const Message = require('../models/Message');

const router = express.Router();

// POST endpoint to submit a message
router.post('/submit', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
});

// GET: Retrieve all message
router.get('/', async (req, res) => {
  try {
      const message = await Message.find();
      res.status(200).json(message);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching Message', error });
  }
});

// DELETE: Delete a message by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
          return res.status(404).json({ message: 'Message not found' });
      }
      res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting Message', error });
  }
});


module.exports = router;
