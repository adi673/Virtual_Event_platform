const express = require('express');
const router = express.Router();
const {getMessageHistory, createMessage, updateMessage, deleteMessage } = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');


// GET message history for a specific room
router.get('/history/:roomId', authMiddleware, getMessageHistory);

// POST create a new message
router.post('/create', authMiddleware, createMessage);

// PUT update a message by messageId
router.put('/update/:messageId', authMiddleware, updateMessage);

// DELETE delete a message by messageId
router.delete('/delete/:messageId', authMiddleware, deleteMessage);

module.exports = router;
