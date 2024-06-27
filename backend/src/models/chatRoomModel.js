// models/chatRoomModel.js

const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    team: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team', 
        required: true 
    },

    type: { 
        type: String, 
        enum: ['Announcement', 'General'], 
        default: 'General'
    },
    
    moderators: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    joinCode: { 
        type: String,
        unique: true 
    }, 
    
    // Optional join code for joining via link
    // Add more fields as per your requirements
});

const chatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = chatRoom;