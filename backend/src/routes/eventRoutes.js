const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createEvent);
router.get('/:teamId', authMiddleware, getEvents);

module.exports = router;
