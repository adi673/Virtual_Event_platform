const Event = require('../models/eventModel');
const Team = require('../models/teamModel');

exports.createEvent = async (req, res) => {
    const { teamId, name, description, date } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        const event = new Event({ team_id: teamId, name, description, date });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEvents = async (req, res) => {
    const { teamId } = req.params;
    try {
        const events = await Event.find({ team_id: teamId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
