const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./db/mongoose');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();
connectDB();
// Middleware
app.use(express.json());
app.use(cookieParser());



// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = app;
