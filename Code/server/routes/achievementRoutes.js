const express = require('express');
const router = express.Router();
const Achievements = require('../models/achievement');


// Create a new achievement
router.post('/', async (req, res) => {
    try {
        const newAchievement = new Achievements(req.body);
        const savedAchievement = await newAchievement.save();
        res.status(201).json(savedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievements.find();
        res.json(achievement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single achievement
router.get('/:id', getAchievement, (req, res) => {
    res.json(res.achievement);
});

// Update an achievement
router.patch('/:id', getAchievement, async (req, res) => {
    try {
        // Update achievement fields as needed
        const updatedAchievement = await res.achievement.save();
        res.json(updatedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an achievement
router.delete('/:id', getAchievement, async (req, res) => {
    try {
        await res.achievement.remove();
        res.json({ message: 'Achievement deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getAchievement(req, res, next) {
    let achievement;
    try {
        achievement = await Achievements.findById(req.params.id);
        if (achievement == null) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.achievement = achievement;
    next();
}

module.exports = router;
