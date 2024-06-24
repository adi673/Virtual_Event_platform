const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user
exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log("Register")
    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        let username=email;
        // Create new user
        user = new User({ username, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ success: true, message: 'User registered', token });
    } catch (err) {
        console.error(err.message);
        console.log("Authcotroller")
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login")
    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.cookie('token', token, { httpOnly: true });
        res.json({ success: true, message: 'User logged in', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'User logged out' });
};
