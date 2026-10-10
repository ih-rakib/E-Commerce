const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const generateToken = async (userId) => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        throw new Error("JWT_SECRET_KEY is not configured");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("user not found")
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' })
    return token;
}

module.exports = generateToken;