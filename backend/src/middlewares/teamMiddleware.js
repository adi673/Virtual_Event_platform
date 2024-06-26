// middlewares/teamMiddleware.js

const Team = require('../models/teamModel');

const checkTeamOwnership = async (req, res, next) => {
    try {
        const { teamId } = req.body;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        if (team.owner.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        req.team = team;
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = checkTeamOwnership;
