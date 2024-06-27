const Chat = require('../models/chatModel');
const Team = require('../models/teamModel');
const ChatRoom = require('../models/chatRoomModel');
const Message = require('../models/messageModel');

const socketUtils = require('../utils/socketUtils'); // Assuming you have socket utility functions

exports.createChatRoom = async (req, res) => {
    try {
        const { name, teamId } = req.body;
        const chatRoom = new ChatRoom({ name, team: teamId, moderators: [req.user.id] });
        await chatRoom.save();

        res.status(201).json({ success: true, chatRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.addMemberToChatRoom = async (req, res) => {
    try {
        const { roomId, memberId } = req.body;
        const chatRoom = await ChatRoom.findById(roomId);

        if (!chatRoom) {
            return res.status(404).json({ success: false, message: 'Chat room not found' });
        }

        if (chatRoom.members.includes(memberId)) {
            return res.status(400).json({ success: false, message: 'User already a member' });
        }

        chatRoom.members.push(memberId);
        await chatRoom.save();

        res.status(200).json({ success: true, chatRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// left to fix below . duplicate code fixed code in messageController.js
exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        if (message.sender.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        await message.remove();
        res.status(200).json({ success: true, message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { roomId, content } = req.body;
        const message = new Message({
            content,
            sender: req.user.id,
            room: roomId,
        });
        await message.save();

        // Emit message to all users in the room using Socket.IO
        req.io.to(roomId).emit('message', {
            ...message._doc,
            sender: {
                id: req.user.id,
                username: req.user.username,
                profilePhoto: req.user.profilePhoto,
            },
        });

        res.status(201).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

//fix below
exports.sendMessage = async (req, res) => {
    const { teamId, message } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        const chatMessage = new Chat({ team_id: teamId, sender: req.user.id, message });
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMessages = async (req, res) => {
    const { teamId } = req.params;
    try {
        const messages = await Chat.find({ team_id: teamId }).populate('sender', 'username');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
