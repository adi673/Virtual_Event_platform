const Team = require('../models/teamModel');
const User = require('../models/userModel');
const ChatRoom = require('../models/chatRoomModel');

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find({ members: req.user.id }).populate('members.userId', 'username email'); // Example of populating member details
        res.status(200).json({ success: true , Teams: teams});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.createTeam = async (req, res) => {
    const { name, description, members } = req.body;
  
    try {
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ success: false, message: 'Team with this name already exists' });
        }
  
        const newTeam = new Team({
            name,
            description,
            owner: req.user.id,
            members: [{ userId: req.user.id, role: 'owner' }, ...members],
        });

        // Create default Announcement and General chat rooms
        const announcementRoom = new ChatRoom({
            name: 'Announcement',
            team: newTeam._id,
            type: 'Announcement',
            members: newTeam.members
        });

        const generalRoom = new ChatRoom({
            name: 'General',
            team: newTeam._id,
            type: 'General',
            members: newTeam.members
        });
  
        await announcementRoom.save();
        await generalRoom.save();
  
        res.status(201).json({ success: true, Team: newTeam, Announcement_Room: announcementRoom, General_room: generalRoom });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.addModerator = async (req, res) => {
    try {
        const { teamId, userId } = req.body;
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        const requestingUser = team.members.find(member => member.userId.toString() === req.user.id);
        if (!requestingUser || (requestingUser.role !== 'owner' && requestingUser.role !== 'admin')) {
            return res.status(403).json({ success: false, message: 'Permission denied' });
        }

        const userToBeUpdated = team.members.find(member => member.userId.toString() === userId);
        if (!userToBeUpdated) {
            return res.status(404).json({ success: false, message: 'User not found in the team' });
        }

        if (userToBeUpdated.role === 'moderator') {
            return res.status(400).json({ success: false, message: 'User already a moderator' });
        }

        team.moderators.push(userId);
        await team.save();

        res.status(200).json({ success: true, Team: team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

//add this in route left it 
exports.addMultipleMembers = async (req, res) => {
    const { teamId, membersToAdd } = req.body;

    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        //learn how this query works?
        const requestingUser = team.members.find(member => member.userId.toString() === req.user.id);
        if (!requestingUser || (requestingUser.role !== 'owner' && requestingUser.role !== 'admin')) {
            return res.status(403).json({ success: false, message: 'Permission denied' });
        }

        membersToAdd.forEach(member => {
            const existingMember = team.members.find(m => m.userId.toString() === member.userId);
            if (existingMember) {
                existingMember.role = member.role || existingMember.role;
            } else {
                team.members.push({ userId: member.userId, role: member.role || 'member' });
            }
        });

        await team.save();

        res.status(200).json({ success: true, message: 'Members added successfully', Team: team });

    } catch (error) {
        console.error('Error adding members to team:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Join team using team ID
exports.joinTeam = async (req, res) => {
    const { teamId } = req.params;
    const userId = req.user.id;
  
    try {
        // Find the team by team_id
        const team = await Team.findOne({ team_id: teamId });
  
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }
  
        // Check if the user is already a member of the team
        if (team.members.some(member => member.userId.toString() === userId)) {
            return res.status(400).json({ success: false, message: 'User already a member of the team' });
        }
  
        // Add user to team members
        team.members.push({ userId: userId, role: 'member' }); // Assuming role defaults to 'member'
        await team.save();
  
        res.json({ success: true, message: 'Joined team successfully', Team: team });
    } catch (err) {
        console.error('Error joining team:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

//left to implement as havent work on chatroom fix postion and file for the following route 

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
        //left to fix this process.env.CLIENT_URL
        const joinLink = `${process.env.CLIENT_URL}/join/${chatRoom._id}`;

        res.status(200).json({ success: true, Link: joinLink });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

//left to implement as havent work on chatroom fix postion and file for the following route 

// Controller function to join a chat room
exports.joinChatRoom = async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user.id; // Assuming authenticated user's ID is accessible via req.user

  try {
    // Find chat room by roomId and populate team details
    const chatRoom = await chatRoom.findById(roomId).populate('team', 'name members');

    if (!chatRoom) {
      return res.status(404).json({ success: false, message: 'Chat room not found' });
    }

    // Check if the user is a member of the team associated with the chat room
    const teamId = chatRoom.team._id; // Assuming team field is populated
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    if (!team.members.includes(userId)) {
      return res.status(403).json({ success: false, message: 'User is not a member of the team' });
    }

    // Logic to join user to chat room
    if (!chatRoom.members.includes(userId)) {
      chatRoom.members.push(userId);
      await chatRoom.save();
    }

    // Optionally, update user's session or perform other necessary operations

    res.status(200).json({ success: true, message: 'Joined chat room successfully', ChatRoom: chatRoom });
  } catch (error) {
    console.error('Error joining chat room:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




//duplicate below if faced any error in above code remove this and try again
// exports.addMember = async (req, res) => {
//     const { teamId, userId } = req.body;
//     try {
//         const team = await Team.findById(teamId);
//         const user = await User.findById(userId);
//         if (!team || !user) {
//             return res.status(404).json({ message: 'Team or user not found' });
//         }
//         if (team.members.includes(userId)) {
//             return res.status(400).json({ message: 'User already in team' });
//         }
//         team.members.push(userId);
//         await team.save();
//         res.status(200).json(team);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };






// Join team using team ID
// exports.joinTeam = async (req, res) => {
//     const { teamId } = req.params;
//     const userId = req.user.id;

//     try {
//         const team = await Team.findOne({ team_id: teamId });

//         if (!team) {
//             return res.status(404).json({ success: false, message: 'Team not found' });
//         }

//         // Check if the user is already a member of the team
//         if (team.members.includes(userId)) {
//             return res.status(400).json({ success: false, message: 'User already a member of the team' });
//         }

//         // Add user to team members
//         team.members.push(userId);
//         await team.save();

//         res.json({ success: true, message: 'Joined team successfully', team });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };


// Get all teams a user is part of
// exports.getUserTeams = async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const teams = await Team.find({ members: userId }).populate('members', '-password');

//         res.json({ success: true, teams });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// };



