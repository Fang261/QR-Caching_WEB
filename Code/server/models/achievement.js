const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    achievement_name: { type: String, required: true }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
