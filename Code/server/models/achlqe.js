const mongoose = require('mongoose');

const achlqeSchema = new mongoose.Schema({
    achlqe_lqe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lqe' },
    achlqe_achivements_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievements' }
});

const Achlqe = mongoose.model('Achlqe', achlqeSchema);

module.exports = Achlqe;
