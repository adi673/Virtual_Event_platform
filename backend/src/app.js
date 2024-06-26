const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./db/mongoose');
const morgan = require('morgan');
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());


// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const chatRoutes = require('./rotutes/chatRoutes')
const eventRoutes = require('./rotutes/eventRoutes')
const teamRoutes = require('./rotutes/teamRoutes')


app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', chatRoutes);
app.use('/api', eventRoutes);
app.use('/api', teamRoutes);


app.get('/posts', (req, res) => {
    res.send('Hello World');
});


// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = app;
