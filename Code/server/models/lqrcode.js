const mongoose = require('mongoose');

const lqrcodeSchema = new mongoose.Schema({
    lqrcode_latitude: { type: Number, default: 0 },
    lqrcode_longitude: { type: Number, default: 0 },
    lqrcode_altitude: { type: Number, default: 0 }
});

const Lqrcode = mongoose.model('Lqrcode', lqrcodeSchema);

module.exports = Lqrcode;
