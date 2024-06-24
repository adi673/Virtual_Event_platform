const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    username: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    profile_picture: {
        type: String
    },
    bio: {
        type: String
    },
    social_links: {
        type: Map,
        of: String
    },
    is_private: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
