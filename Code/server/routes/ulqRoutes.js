const express = require('express');
const router = express.Router();
const Ulq = require('../models/ulq');

// Create a new ulq
router.post('/', async (req, res) => {
    try {
        const newUlq = new Ulq(req.body);
        const savedUlq = await newUlq.save();
        res.status(201).json(savedUlq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all ulqs
router.get('/', async (req, res) => {
    try {
        const ulqs = await Ulq.find();
        res.json(ulqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single ulq
router.get('/:id', getUlq, (req, res) => {
    res.json(res.ulq);
});

// Update a ulq
router.patch('/:id', getUlq, async (req, res) => {
    try {
        // Update ulq fields as needed
        const updatedUlq = await res.ulq.save();
        res.json(updatedUlq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a ulq
router.delete('/:id', getUlq, async (req, res) => {
    try {
        await res.ulq.remove();
        res.json({ message: 'Ulq deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getUlq(req, res, next) {
    let ulq;
    try {
        ulq = await Ulq.findById(req.params.id);
        if (ulq == null) {
            return res.status(404).json({ message: 'Ulq not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.ulq = ulq;
    next();
}

module.exports = router;
