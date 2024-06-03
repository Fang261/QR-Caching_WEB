const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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

router.post('/signup', async (req, res) => {
    try {
        // Find the user with the highest user_id
        const highestUser = await User.findOne().sort({ user_id: -1 });
        let nextUserId = 1; // Default value if no user exists yet

        if (highestUser) {
            nextUserId = highestUser.user_id + 1;
        }

        const { user_name, user_email, user_password } = req.body;
        const newUser = new User({
            user_id: nextUserId,
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

// Login route
router.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        // Find the user by email
        const user = await User.findOne({ user_email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password with the plain text password stored in the database
        if (user.user_password !== user_password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // User authenticated successfully
        res.status(200).json({ message: 'Login successful', userId: user._id });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: error.message });
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
