const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/profile', authMiddleware, profileController.getProfile);
router.put('/profile', authMiddleware, profileController.updateProfile);
router.post('/change-password', authMiddleware, profileController.changePassword);

module.exports = router;
