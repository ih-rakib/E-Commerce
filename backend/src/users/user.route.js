const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

const isValidEmail = (email) => typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email.trim());

const getCookieOptions = () => {
    const isProd = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProd, // only require HTTPS in production so localhost works
        sameSite: isProd ? 'None' : 'Lax',
        maxAge: 60 * 60 * 1000, // 1 hour, matches JWT expiry
        path: '/',
    };
};

// register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ message: "username, email and password are required" });
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ message: "Please provide a valid email address" });
        }
        if (password.length < 6) {
            return res.status(400).send({ message: "Password must be at least 6 characters long" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).send({ message: "Email is already registered" });
        }

        const user = new User({ username: username.trim(), email: normalizedEmail, password })
        await user.save();

        res.status(201).send({ message: "user registered successfully" })
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(409).send({ message: "Email is already registered" });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "something went wrong!" })
    }
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send({ message: 'Email and password are required' });
        }

        // Fetch the user by email (case-insensitive via lowercase storage)
        const user = await User.findOne({ email: String(email).trim().toLowerCase() });

        // Generic message to avoid user enumeration
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored password FIRST
        const isMatched = await user.comparePassword(password);

        if (!isMatched) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Only issue a token after credentials are verified
        const token = await generateToken(user._id);
        if (!token) {
            return res.status(500).send({ message: 'Failed to generate token' });
        }

        res.cookie('token', token, getCookieOptions())

        // get user data without password (reuse fetched user)
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).send({ message: 'Login successful', token, user: userObj });

    } catch (error) {
        console.error('Error during login:', error); // Log error for debugging
        return res.status(500).send({ message: 'Server error' });
    }
})

// logout
router.post('/logout', async (req, res) => {
    res.clearCookie('token', getCookieOptions())
    res.status(200).send({ message: "logged out successfully" })
})

// delete user (admin only)
router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid user id" });
        }
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }

        res.status(200).send({ message: "user deleted successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting user" })
    }
})

// get all users (admin only)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '_id username email role createdAt').sort({ createdAt: -1 }).limit(200)
        res.status(200).send(users)
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching user" })
    }
})

// update user role (admin only, whitelisted roles)
router.put('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid user id" });
        }

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).send({ message: "Invalid role. Allowed values: user, admin" });
        }

        const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password')

        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }

        // Send the response with the updated user
        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating user" })
    }
})

// edit or update profile (authenticated, owners only unless admin)
router.patch('/update-profile', verifyToken, async (req, res) => {
    try {
        const { userId, username, profileImg, bio, profession } = req.body;

        if (!userId) {
            return res.status(400).send({ message: "userId is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "Invalid userId" });
        }

        // Only the owner or an admin can update a profile
        if (req.userId !== String(userId) && req.role !== 'admin') {
            return res.status(403).send({ message: "You are not authorized to update this profile" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        // update profile (whitelisted fields only)
        if (username !== undefined) user.username = String(username).trim();
        if (profileImg !== undefined) user.profileImg = String(profileImg).trim();
        if (bio !== undefined) user.bio = String(bio);
        if (profession !== undefined) user.profession = String(profession).trim();

        await user.save();

        const userData = await User.findById(userId).select('-password');
        res.status(200).send({
            message: "user profile updated successfully",
            user: userData
        })

    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "Error updating user profile" })
    }
})

module.exports = router
