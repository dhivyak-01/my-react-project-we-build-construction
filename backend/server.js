// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/users")
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((e) => {
//     console.error("Database connection error: " + e);
//   });

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   fname: String,
//   lname: String,
//   dob: String,
//   gender: String,
//   email: String,
//   phoneno: String,
//   city: String,
//   avatar: String,
//   password: { type: String, required: true },
// }, { timestamps: true }); 

// const User = mongoose.model("User", userSchema);

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Ensure this directory exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//   },
// });

// const upload = multer({ storage });

// // Endpoint to check-unique
// app.post("/api/users/check-unique", async (req, res) => {
//   const { email, phoneno, excludeId } = req.body;

//   try {
//     // Find existing user with either the email or phone number, excluding the current user
//     const existingUser = await User.findOne({
//       $or: [{ email }, { phoneno }],
//       ...(excludeId && { _id: { $ne: excludeId } }), // Exclude current user's ID
//     });

//     if (existingUser) {
//       // If a user exists, check the uniqueness
//       return res.json({
//         isEmailUnique: existingUser.email !== email,
//         isPhoneNoUnique: existingUser.phoneno !== phoneno,
//       });
//     }

//     // If no existing user is found, both are unique
//     res.json({
//       isEmailUnique: true,
//       isPhoneNoUnique: true,
//     });
//   } catch (error) {
//     console.error("Error checking uniqueness:", error);
//     res.status(500).json({ error: "Server error while checking uniqueness" });
//   }
// });

// // Endpoint to add a user with avatar upload
// app.post("/api/users", upload.single("avatar"), async (req, res) => {
//   try {
//     // Convert date to mm/dd/yyyy format if it's provided
//     const formattedDob = req.body.dob ? new Date(req.body.dob).toLocaleDateString('en-US') : null;

//     const newUser = new User({
//       ...req.body,
//       dob: formattedDob, // Ensure the dob is formatted here
//       password: req.body.password,
//       avatar: req.file ? req.file.path : null,
//     });

//     await newUser.save();
//     res.status(201).send({ message: "User added successfully", user: newUser });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(400).send({ error: "Failed to save user" });
//   }
// });


// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find().sort({ createdAt: -1 }); // Sort by creation date, latest first
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send({ error: "Failed to fetch users" });
//   }
// });

// // Serve uploaded files statically
// app.use("/uploads", express.static("uploads"));

// app.put("/api/users/:id", upload.single("avatar"), async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const existingUser = await User.findById(userId);
//     if (!existingUser) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     const updatedUserData = {
//       fname: req.body.fname || existingUser.fname,
//       lname: req.body.lname || existingUser.lname,
//       dob: req.body.dob || existingUser.dob,
//       gender: req.body.gender || existingUser.gender,
//       email: req.body.email || existingUser.email,
//       phoneno: req.body.phoneno || existingUser.phoneno,
//       city: req.body.city || existingUser.city,
//       avatar: req.file ? req.file.path : existingUser.avatar,
//     };
//     if (req.body.password) {
//       updatedUserData.password = req.body.password;
//     }
//     const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
//       new: true,
//     });
//     res.send({ message: "User updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(400).send({ error: "Failed to update user" });
//   }
// });

// app.delete("/api/users/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await User.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     res.status(204).send({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).send({ error: "Server error" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });























const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const callbackRoutes = require('./routes/callBackRoutes'); // Import callback routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/api/users', userRoutes);

// Use callback request routes
app.use('/api/callbacks', callbackRoutes); // Add callback routes

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});