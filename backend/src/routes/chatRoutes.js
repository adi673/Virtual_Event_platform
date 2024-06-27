const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { createChatRoom, addMemberToChatRoom, createMessage, deleteMessage } = require('../controllers/chatController');


router.post('/send', authMiddleware, sendMessage);
router.get('/:teamId', authMiddleware, getMessages);
router.post('/create', authMiddleware, createChatRoom);
router.post('/addMember', authMiddleware, addMemberToChatRoom);

//duplicate code fixed in messageController.js and routes in messageRoutes.js
router.post('/messages/create', authMiddleware, createMessage);
router.delete('/messages/:messageId', authMiddleware, deleteMessage);

module.exports = router;
