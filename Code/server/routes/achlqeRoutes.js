const express = require('express');
const router = express.Router();
const Achlqe = require('../models/achlqe');

// Create a new achlqe
router.post('/', async (req, res) => {
    try {
        const newAchlqe = new Achlqe(req.body);
        const savedAchlqe = await newAchlqe.save();
        res.status(201).json(savedAchlqe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all achlqes
router.get('/', async (req, res) => {
    try {
        const achlqes = await Achlqe.find();
        res.json(achlqes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single achlqe
router.get('/:id', getAchlqe, (req, res) => {
    res.json(res.achlqe);
});

// Update an achlqe
router.patch('/:id', getAchlqe, async (req, res) => {
    try {
        // Update achlqe fields as needed
        const updatedAchlqe = await res.achlqe.save();
        res.json(updatedAchlqe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an achlqe
router.delete('/:id', getAchlqe, async (req, res) => {
    try {
        await res.achlqe.remove();
        res.json({ message: 'Achlqe deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getAchlqe(req, res, next) {
    let achlqe;
    try {
        achlqe = await Achlqe.findById(req.params.id);
        if (achlqe == null) {
            return res.status(404).json({ message: 'Achlqe not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.achlqe = achlqe;
    next();
}

module.exports = router;
