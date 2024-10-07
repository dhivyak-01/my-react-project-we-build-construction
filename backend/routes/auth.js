// router/auth.js
const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Successfully logged in
        res.send({ message: 'Login successful', success: true });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

module.exports = router;