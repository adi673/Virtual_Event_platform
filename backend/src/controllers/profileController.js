const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id).select('-password_hash');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateProfile = async (req, res) => {
    const { username, bio, profile_picture, social_links, is_private } = req.body;
    try {
        let user = await User.findById(req.user.user_id);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.profile_picture = profile_picture || user.profile_picture;
        user.social_links = social_links || user.social_links;
        user.is_private = is_private !== undefined ? is_private : user.is_private;
        user.updated_at = Date.now();

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        let user = await User.findById(req.user.user_id);
        if (!user || !user.comparePassword(currentPassword)) {
            return res.status(400).json({ success: false, msg: 'Invalid current password' });
        }

        user.password_hash = bcrypt.hashSync(newPassword, 10);
        user.updated_at = Date.now();
        await user.save();
        res.json({ success: true, msg: 'Password updated successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
