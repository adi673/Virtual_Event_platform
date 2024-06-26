const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Default image URL (adjust the URL as per your requirements)

//left to fix this link
const DEFAULT_PROFILE_IMAGE = 'https://example.com/default-team-profile.png';

const teamSchema = new mongoose.Schema({
    team_id: { 
        type: String, 
        default: uuidv4, 
        unique: true 
    },

    name: { 
        type: String, 
        required: true 
    },

    description: { 
        type: String 
    },

    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },

    // moderators: [{ 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'User' 
    // }],

    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        role: {
            type: String,
            enum: ['owner', 'moderator', 'member'],
            default: 'member',
        },
    },],

    events: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event' 
    }],

    profile_image: { 
        type: String, 
        default: DEFAULT_PROFILE_IMAGE 
    },

    created_at: { 
        type: Date, 
        default: Date.now 
    },

    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
