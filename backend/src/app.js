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
const teamRoutes = require('./routes/teamRoutes');
const chatRoutes = require('./routes/chatRoutes');
const eventRoutes = require('./routes/eventRoutes');
const messageRoutes = require('./routes/messageRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/dashboard', profileRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/', chatRoutes);
app.use('/api', eventRoutes);



app.get('/posts ', (req, res) => {
    res.send('Hello World');
});


// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = app;
