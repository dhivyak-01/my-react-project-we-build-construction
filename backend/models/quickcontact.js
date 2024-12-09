const mongoose = require('mongoose');

// Define the form schema
const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the QuickContact model based on the schema
const QuickContact = mongoose.model('QuickContact', formSchema, 'quickcontacts'); // Explicit collection name
module.exports = QuickContact;
