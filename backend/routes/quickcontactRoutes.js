const express = require('express');
const router = express.Router();
const QuickContact = require('../models/quickcontact');

// POST request to handle form submission
router.post('/submitForm', async (req, res) => {
  try {
    const { name, email, date, message } = req.body;

    // Create a new form entry in the database
    const newForm = new QuickContact({
      name,
      email,
      date,
      message,
    });

    // Save the form data to the database
    await newForm.save();

    // Send success response
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Error submitting form:', err); // Detailed error message will be logged here
    res.status(500).json({ error: 'There was an error processing your form. Please try again.' });
  }
});


router.get('/quickcontact', async (req, res) => {
  try {
    const emails = await QuickContact.find();
    console.log('Fetched emails from DB:', emails); // Log the fetched emails
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Error fetching emails' });
  }
});

// DELETE: Delete a QuickContact entry by ID
router.delete('/quickcontact/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmail = await QuickContact.findByIdAndDelete(id);
    if (!deletedEmail) {
      return res.status(404).json({ message: 'Email not found' });
    }
    res.status(200).json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    res.status(500).json({ message: 'Error deleting email. Please try again.' });
  }
});


module.exports = router;
