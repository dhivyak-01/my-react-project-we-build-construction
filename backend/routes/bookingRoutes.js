const express = require('express');
const Booking = require('../models/bookingModel');  // Import the Booking model

const router = express.Router();


router.post('/confirm-booking', async (req, res) => {
  const item = req.body.item;  // Expecting a single item object
  
  if (!item) {
    return res.status(400).json({ message: 'No item provided.' });
  }

  try {
    const newBooking = new Booking({
      name: item.name,
      email: item.email,
      number: item.number,
      address: item.address,
      service: item.service,
      description: item.description,
    });

    await newBooking.save();

    res.status(200).json({ message: 'Booking confirmed and saved to the database.' });
  } catch (err) {
    console.error('Error confirming booking:', err);
    res.status(500).json({ error: 'Failed to save booking.' });
  }
});

router.get('/booking', async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log('Fetched emails from DB:', bookings); 
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// DELETE: Delete a Bookings entry by ID
router.delete('/booking/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting Booking:', error);
    res.status(500).json({ message: 'Error deleting Booking. Please try again.' });
  }
});





module.exports = router;
