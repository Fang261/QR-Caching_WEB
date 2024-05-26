const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    user_name: { type: String, required: true },
    user_phone: { type: Number, required: true },
    user_bdate: Date,
    user_password: { type: String, required: true },
    user_email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
