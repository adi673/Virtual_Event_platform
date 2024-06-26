const express = require('express');
const { createTeam, getTeams, addMember } = require('../controllers/teamController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { createTeam, addModerator, generateJoinLink } = require('../controllers/teamController');

router.post('/create', authMiddleware, createTeam);
router.get('/', authMiddleware, getTeams);
router.post('/add-member', authMiddleware, addMember);
router.post('/addModerator', authMiddleware, addModerator);
router.post('/generateJoinLink', authMiddleware, generateJoinLink);

// Route to join a team using team ID
router.put('/join/:teamId', authMiddleware, teamController.joinTeam);

// Route to get all teams a user is part of
router.get('/user-teams', authMiddleware, teamController.getUserTeams);

module.exports = router;
