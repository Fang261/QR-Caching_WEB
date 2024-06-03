const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get the latest user ID
router.get('/latest-id', async (req, res) => {
    try {
        const latestUser = await User.findOne().sort({ user_id: -1 });
        if (latestUser) {
            res.json({ latest_id: latestUser.user_id });
        } else {
            res.json({ latest_id: 0 }); // If no users exist, start from ID 0
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.user_name != null) {
        res.user.user_name = req.body.user_name;
    }
    if (req.body.user_phone != null) {
        res.user.user_phone = req.body.user_phone;
    }
    if (req.body.user_bdate != null) {
        res.user.user_bdate = req.body.user_bdate;
    }
    if (req.body.user_password != null) {
        res.user.user_password = req.body.user_password;
    }
    if (req.body.user_email != null) {
        res.user.user_email = req.body.user_email;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        // Get the latest user ID
        const latestIdResponse = await fetch('/users/latest-id');
        const latestIdData = await latestIdResponse.json();
        const latestId = latestIdData.latest_id;

        // Increment the latest user ID
        const newUserId = latestId + 1;

        // Create the new user
        const { user_name, user_email, user_password } = req.body;
        const newUser = new User({
            user_id: newUserId,
            user_name,
            user_email,
            user_password
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}

module.exports = router;
