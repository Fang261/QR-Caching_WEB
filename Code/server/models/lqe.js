const mongoose = require('mongoose');

const lqeSchema = new mongoose.Schema({
    lqe_lqrcode_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lqrcode' },
    lqe_events_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

const Lqe = mongoose.model('Lqe', lqeSchema);

module.exports = Lqe;
