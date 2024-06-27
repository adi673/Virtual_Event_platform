// models/messageModel.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: { 
        type: String, 
        required: true 
    },

    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ChatRoom', 
        required: true 
    },

    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    
    // Add more fields as per your requirements
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;