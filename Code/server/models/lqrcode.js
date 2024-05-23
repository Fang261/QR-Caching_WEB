const mongoose = require('mongoose');

const lqrcodeSchema = new mongoose.Schema({
    lqrcode_latitude: { type: Number, default: 0 },
    lqrcode_longitude: { type: Number, default: 0 },
    lqrcode_altitude: { type: Number, default: 0 },
    lqrcode_is_event: { type: Boolean, default: false },
    lqrcode_is_quest: { type: Boolean, default: false }

});

const Lqrcode = mongoose.model('Lqrcode', lqrcodeSchema);

module.exports = Lqrcode;
