const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_id: {type: Number, required: true},
    post_foto: {type: String, default: null},
    post_text: {type: String, default: null},
    post_date: { type: Date, default: null}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
