const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Adding createdAt and updatedAt timestamps

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
