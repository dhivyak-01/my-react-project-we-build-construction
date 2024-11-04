// scripts/seedAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin'); // Adjust the path as necessary
const CarouselItem = require('../models/CarouselItem'); // Import CarouselItem model
const bcrypt = require('bcrypt');
const connectDB = require('../config/db'); // Import your connection logic

const seedAdmin = async () => {
    try {
        // Connect to MongoDB using the existing connection logic
        await connectDB();

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email: 'adminlogin@example.com' });
        if (adminExists) {
            console.log('Admin user already exists.');
        } else {
            const hashedPassword = await bcrypt.hash('admin_password', 10);
            const adminUser = new Admin({
                email: 'adminlogin@example.com',
                password: hashedPassword,
            });

            await adminUser.save();
            console.log('Admin user created successfully.');
        }

        // Seed carousel items
        const initialCarouselData = [
            {
                image: 'uploads/image1.jpg',
                icon: 'home',
                heading: 'Welcome to Our Site',
                caption: 'Discover amazing features',
            },
            {
                image: 'uploads/image2.jpg',
                icon: 'tool',
                heading: 'Tools and Resources',
                caption: 'Explore our tools',
            },
        ];

        // Check if carousel items already exist
        const carouselItemsExist = await CarouselItem.countDocuments();
        if (carouselItemsExist === 0) {
            await CarouselItem.insertMany(initialCarouselData);
            console.log('Carousel items created successfully.');
        } else {
            console.log('Carousel items already exist.');
        }

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close(); // Close the connection
    }
};

seedAdmin();