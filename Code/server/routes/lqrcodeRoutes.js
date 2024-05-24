const express = require('express');
const router = express.Router();
const Lqrcode = require('../models/lqrcode');

// Create a new lqrcode
router.post('/', async (req, res) => {
    try {
        const newLqrcode = new Lqrcode(req.body);
        const savedLqrcode = await newLqrcode.save();
        res.status(201).json(savedLqrcode);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all lqrcodes
router.get('/', async (req, res) => {
    try {
        const lqrcodes = await Lqrcode.find();
        console.log(lqrcodes);
        res.json(lqrcodes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single lqrcode
router.get('/:id', getLqrcode, (req, res) => {
    res.json(res.lqrcode);
});

// Update a lqrcode
router.patch('/:id', getLqrcode, async (req, res) => {
    try {
        // Update lqrcode fields as needed
        const updatedLqrcode = await res.lqrcode.save();
        res.json(updatedLqrcode);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a lqrcode
router.delete('/:id', getLqrcode, async (req, res) => {
    try {
        await res.lqrcode.remove();
        res.json({ message: 'Lqrcode deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getLqrcode(req, res, next) {
    let lqrcode;
    try {
        lqrcode = await Lqrcode.findById(req.params.id);
        if (lqrcode == null) {
            return res.status(404).json({ message: 'Lqrcode not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.lqrcode = lqrcode;
    next();
}

module.exports = router;
