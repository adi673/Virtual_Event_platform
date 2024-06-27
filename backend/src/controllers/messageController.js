// controllers/messageController.js

const Message = require('../models/messageModel');
const ChatRoom = require('../models/chatRoomModel');
const Team = require('../models/teamModel');
const socketUtils = require('../utils/socketUtils'); // Assuming you have socket utility functions

exports.getMessageHistory = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Fetch all messages for the given roomId
        const messages = await Message.find({ room: roomId })
            .populate('sender', 'username profilePhoto') // Populate sender details
            .sort({ createdAt: 1 }); // Optionally, sort by createdAt or any other field

        res.status(200).json({ success: true, messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { content } = req.body;

        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Find the message by ID and ensure the sender matches the current user
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        // Check if the current user is the sender of the message
        if (message.sender.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized to update this message' });
        }

        // Update the message content
        message.content = content;
        await message.save();

        // Emit message update to all users in the room using Socket.IO
        const updatedMessage = await Message.findById(messageId).populate('sender', 'username profilePhoto');
        socketUtils.emitMessageUpdate(req.io, message.room, updatedMessage); // Update the room ID as per your setup

        res.status(200).json({ success: true, message: updatedMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.createMessage = async (req, res) => {
    try {
        const { roomId, content } = req.body;
        const userId = req.user.id;

        const chatRoom = await ChatRoom.findById(roomId).populate('team');

        if (!chatRoom) {
            return res.status(404).json({ success: false, message: 'Chat room not found' });
        }

        // Check if the user is authorized to post in the room
        const isAuthorized = await checkMessageAuthorization(chatRoom, userId);

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'You are not authorized to post in this room' });
        }

        const message = new Message({ room: roomId, sender: userId, content });
        await message.save();

        // Emit message to all users in the room using Socket.IO
        req.io.to(roomId).emit('message', message);

        res.status(201).json({ success: true, message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

async function checkMessageAuthorization(chatRoom, userId) {
    if (chatRoom.type === 'Announcement') {
        const team = await Team.findById(chatRoom.team._id);
        return team.owner.toString() === userId || team.members.some(member => member.userId.toString() === userId && member.role === 'admin');
    } else if (chatRoom.type === 'General') {
        return chatRoom.members.some(member => member.toString() === userId);
    }
    return false;
}

exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user.id;

        const message = await Message.findById(messageId).populate('room sender');
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        const chatRoom = await ChatRoom.findById(message.room._id).populate('team');
        if (!chatRoom) {
            return res.status(404).json({ success: false, message: 'Chat room not found' });
        }

        const team = await Team.findById(chatRoom.team._id);
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        // Check if user is authorized to delete the message
        const isAuthorized = await checkMessageDeletionAuthorization(team, chatRoom, message, userId);

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'You do not have permission to delete this message' });
        }

        await message.remove();
        return res.status(200).json({ success: true, message: 'Message deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

async function checkMessageDeletionAuthorization(team, chatRoom, message, userId) {
    if (team.owner.toString() === userId || team.members.some(member => member.userId.toString() === userId && member.role === 'admin')) {
        return true; // Owner or admin can delete any message
    }

    const isModerator = chatRoom.moderators.some(moderator => moderator.toString() === userId);
    if (isModerator) {
        return true; // Moderators can delete messages
    }

    if (message.sender._id.toString() === userId) {
        return true; // Sender can delete their own message
    }

    return false;
}
