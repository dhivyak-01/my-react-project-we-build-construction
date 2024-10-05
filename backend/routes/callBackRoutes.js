const express = require('express');
const CallbackRequest = require('../models/CallBackRequest')
const router = express.Router();

// Submit Callback Request
router.post('/submit', async (req, res) => {
    try {
      const { name, email, message, callbackDate, callbackTime } = req.body;
  
      const newRequest = new CallbackRequest({
        name,
        email,
        message,
        callbackDate,
        callbackTime,
      });
  
      await newRequest.save();
      res.status(201).json({ message: 'Callback request submitted successfully!' });
    } catch (error) {
      console.error('Error saving callback request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Get All Callback Requests
router.get('/', async (req, res) => {
  try {
    const requests = await CallbackRequest.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching callback requests:', error);
    res.status(500).json({ error: 'Failed to fetch callback requests' });
  }
});

module.exports = router;