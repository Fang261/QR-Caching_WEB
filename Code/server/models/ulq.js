const mongoose = require('mongoose');

const ulqSchema = new mongoose.Schema({
    ulq_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ulq_post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    ulq_lqrcode_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lqrcode' }
});

const Ulq = mongoose.model('Ulq', ulqSchema);

module.exports = Ulq;
