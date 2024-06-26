const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const teamSchema = new mongoose.Schema({
    team_id: { 
        type: String, 
        default: uuidv4, unique: true 
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

    moderators: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    events: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event' 
    }],

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
