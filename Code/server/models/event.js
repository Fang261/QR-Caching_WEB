const mongoose = require('mongoose');
const { events } = require('./achievement');

const eventSchema = new mongoose.Schema({
    events_id: { type: Number, required: true },
    events_name: { type: String, required: true },
    events_latitude: { type: Number, default: 0 },
    events_longitude: { type: Number, default: 0 },
    events_idate: { type: Date, required: true },
    events_fdate: Date
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
