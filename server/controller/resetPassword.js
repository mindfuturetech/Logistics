// server/controller/resetPassword.js
const User = require('../models/User');

const resetPassword = async (req, res) => {
    const { username, currentPassword, newPassword, retypePassword } = req.body;

    if(newPassword !== retypePassword){
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password !== currentPassword) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = resetPassword;