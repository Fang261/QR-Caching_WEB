const mongoose = require('mongoose');

const achievementsSchema = new mongoose.Schema({
    achievements_name: { type: String, required: true }
});

const Achievements = mongoose.model('Achievements', achievementsSchema);

module.exports = Achievements;
