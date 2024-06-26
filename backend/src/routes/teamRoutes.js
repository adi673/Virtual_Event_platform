const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { getTeams, createTeam, addModerator, addMultipleMembers, joinTeam, generateJoinLink, joinChatRoom } = require('../controllers/teamController');

router.get('/', authMiddleware, getTeams);
router.post('/create', authMiddleware, createTeam);
router.post('/add-member', authMiddleware, addMember);
router.post('/addModerator', authMiddleware, addModerator);
router.post('/addMultipleMembers', authMiddleware, addMultipleMembers);
router.put('/joinTeam/:teamId', authMiddleware, joinTeam);

//left to work on this route work on the following routes while woring on chat room and fix their postion in respective files
router.get('/generateJoinLink', authMiddleware, generateJoinLink);
router.post('/joinChatRoom/:roomId', authMiddleware, joinChatRoom);

module.exports = router;
