const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
