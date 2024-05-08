const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Create a new event
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single event
router.get('/:id', getEvent, (req, res) => {
    res.json(res.event);
});

// Update an event
router.patch('/:id', getEvent, async (req, res) => {
    try {
        if (req.body.events_name != null) {
            res.event.events_name = req.body.events_name;
        }
        if (req.body.events_latitude != null) {
            res.event.events_latitude = req.body.events_latitude;
        }
        if (req.body.events_longitude != null) {
            res.event.events_longitude = req.body.events_longitude;
        }
        if (req.body.events_idate != null) {
            res.event.events_idate = req.body.events_idate;
        }
        if (req.body.events_fdate != null) {
            res.event.events_fdate = req.body.events_fdate;
        }
        const updatedEvent = await res.event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', getEvent, async (req, res) => {
    try {
        await res.event.remove();
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getEvent(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.event = event;
    next();
}

module.exports = router;
