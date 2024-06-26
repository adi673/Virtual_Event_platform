const Team = require('../models/teamModel');
const User = require('../models/userModel');

//duplicate below
exports.createTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const team = new Team({ name, owner: req.user.id });
        await team.save();

        res.status(201).json({ success: true, team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.addModerator = async (req, res) => {
    try {
        const { teamId, userId } = req.body;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        if (team.owner.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        if (team.moderators.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User already a moderator' });
        }

        team.moderators.push(userId);
        await team.save();

        res.status(200).json({ success: true, team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.generateJoinLink = async (req, res) => {
    try {
        const { roomId } = req.body;
        const chatRoom = await ChatRoom.findById(roomId);

        if (!chatRoom) {
            return res.status(404).json({ success: false, message: 'Chat room not found' });
        }

        if (!chatRoom.moderators.includes(req.user.id)) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        // Generate join link
        const joinLink = `${process.env.CLIENT_URL}/join/${chatRoom._id}`;

        res.status(200).json({ success: true, joinLink });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

//fix below
exports.createTeam = async (req, res) => {
    const { name, description } = req.body;
    try {
        const team = new Team({ name, description, members: [req.user.id] });
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({ members: req.user.id });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMember = async (req, res) => {
    const { teamId, userId } = req.body;
    try {
        const team = await Team.findById(teamId);
        const user = await User.findById(userId);
        if (!team || !user) {
            return res.status(404).json({ message: 'Team or user not found' });
        }
        if (team.members.includes(userId)) {
            return res.status(400).json({ message: 'User already in team' });
        }
        team.members.push(userId);
        await team.save();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Join team using team ID
exports.joinTeam = async (req, res) => {
    const { teamId } = req.params;
    const userId = req.user.id;

    try {
        const team = await Team.findOne({ team_id: teamId });

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        // Check if the user is already a member of the team
        if (team.members.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User already a member of the team' });
        }

        // Add user to team members
        team.members.push(userId);
        await team.save();

        res.json({ success: true, message: 'Joined team successfully', team });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


// Get all teams a user is part of
exports.getUserTeams = async (req, res) => {
    const userId = req.user.id;

    try {
        const teams = await Team.find({ members: userId }).populate('members', '-password');

        res.json({ success: true, teams });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};