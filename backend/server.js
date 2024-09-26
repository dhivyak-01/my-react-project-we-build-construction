const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.error("Database connection error: " + e);
  });

// Define the User schema
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  dob: String,
  gender: String,
  email: String,
  phoneno: String,
  city: String,
  avatar: String, // Store the image path here
  password: { type: String, required: true }, // Store plain text password
});

const User = mongoose.model("User", userSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Endpoint to add a user with avatar upload
app.post("/api/users", upload.single("avatar"), async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
      password: req.body.password,
      avatar: req.file ? req.file.path : null,
    });
    await newUser.save();
    res.status(201).send({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(400).send({ error: "Failed to save user" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.put('/api/users/:id', upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ error: "User not found" });
    }
    const updatedUserData = {
      fname: req.body.fname || existingUser.fname,
      lname: req.body.lname || existingUser.lname,
      dob: req.body.dob || existingUser.dob,
      gender: req.body.gender || existingUser.gender,
      email: req.body.email || existingUser.email,
      phoneno: req.body.phoneno || existingUser.phoneno,
      city: req.body.city || existingUser.city,
      avatar: req.file ? req.file.path : existingUser.avatar,
    };
    if (req.body.password) {
      updatedUserData.password = req.body.password;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send({ error: "Failed to update user" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(204).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
























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
//   avatar: String, // Store the image path here
//   password: { type: String, required: true }, // Store hashed password
// });

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


// // Endpoint to add a user with avatar upload
// app.post("/api/users", upload.single("avatar"), async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
//     const newUser = new User({
//       ...req.body,
//       password: hashedPassword, // Save the hashed password
//       avatar: req.file ? req.file.path : null, // Check if file exists
//     });
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(400).send({ error: "Failed to save user" });
//   }
// });

// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send({ error: "Failed to fetch users" });
//   }
// });

// // Serve uploaded files statically
// app.use("/uploads", express.static("uploads"));

// app.put('/api/users/:id', upload.single('avatar'), async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Find the existing user
//     const existingUser = await User.findById(userId);
//     if (!existingUser) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     // Handle password update if provided
//     const updatedUserData = {
//       fname: req.body.fname || existingUser.fname,
//       lname: req.body.lname || existingUser.lname,
//       dob: req.body.dob || existingUser.dob,
//       gender: req.body.gender || existingUser.gender,
//       email: req.body.email || existingUser.email,
//       phoneno: req.body.phoneno || existingUser.phoneno,
//       city: req.body.city || existingUser.city,
//       avatar: req.file ? req.file.path : existingUser.avatar // Keep existing avatar if no new file
//     };

//     if (req.body.password) {
//       updatedUserData.password = await bcrypt.hash(req.body.password, 10); // Hash new password if provided
//     }

//     // Update the user in the database
//     const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
//     res.send(updatedUser);
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
//       return res.status(404).send("User not found");
//     }
//     res.status(204).send(); // No content on successful delete
//   } catch (error) {
//     res.status(500).send("Server error");
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
