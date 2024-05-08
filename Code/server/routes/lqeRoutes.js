const express = require('express');
const router = express.Router();
const Lqe = require('../models/lqe');

// Create a new lqe
router.post('/', async (req, res) => {
    try {
        const newLqe = new Lqe(req.body);
        const savedLqe = await newLqe.save();
        res.status(201).json(savedLqe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all lqes
router.get('/', async (req, res) => {
    try {
        const lqes = await Lqe.find();
        res.json(lqes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single lqe
router.get('/:id', getLqe, (req, res) => {
    res.json(res.lqe);
});

// Update a lqe
router.patch('/:id', getLqe, async (req, res) => {
    try {
        // Update lqe fields as needed
        const updatedLqe = await res.lqe.save();
        res.json(updatedLqe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a lqe
router.delete('/:id', getLqe, async (req, res) => {
    try {
        await res.lqe.remove();
        res.json({ message: 'Lqe deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getLqe(req, res, next) {
    let lqe;
    try {
        lqe = await Lqe.findById(req.params.id);
        if (lqe == null) {
            return res.status(404).json({ message: 'Lqe not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.lqe = lqe;
    next();
}

module.exports = router;
