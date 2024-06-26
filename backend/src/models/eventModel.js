const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({
    event_id: { type: String, default: uuidv4, unique: true },
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
