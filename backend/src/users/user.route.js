const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

// register 
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({ username, email, password })

        await user.save();
        res.status(201).send({ message: "user registered successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "something went wrong!" })
    }
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Compare the provided password with the stored password
        const isMatched = await user.comparePassword(password);

        // token
        const token = await generateToken(user._id);

        // console.log(token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        // get user data without password
        const userData = await User.findOne({ email }).select('-password');

        if (isMatched) {
            return res.status(200).send({ message: 'Login successful', token, user: userData });
        } else {
            return res.status(400).send({ message: 'Invalid password' });
        }

    } catch (error) {
        console.error('Error during login:', error); // Log error for debugging
        return res.status(500).send({ message: 'Server error' });
    }
})

// logout
router.post('/logout', async (req, res) => {
    res.clearCookie('token')
    res.status(200).send({ message: "logged out successfully" })
})

// delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
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

// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'id email role').sort({ createdAt: -1 })
        res.status(200).send(users)
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching user" })
    }
})

// update user role
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await User.findByIdAndUpdate(id, { role }, { new: true })

        if (!user) {
            res.status(404).send({ message: "user not found" })
        }

        // Send the response with the updated user
        res.status(200).send({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating user" })
    }
})

// edit or update profile
router.patch('/update-profile', async (req, res) => {
    try {
        const { userId, username, profileImg, bio, profession } = req.body;

        if (!userId) {
            res.status(200).send({ message: "userId is required" });
        }

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).send({ message: "user not found" });
        }

        // update profile
        if (username !== undefined) user.username = username;
        if (profileImg !== undefined) user.profileImg = profileImg;
        if (bio !== undefined) user.bio = bio;
        if (profession !== undefined) user.profession = profession;

        await user.save();

        const userData = await User.findById(userId);
        res.status(201).send({
            message: "user profile updated successfully",
            user: userData
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating user profile" })
    }
})

module.exports = router