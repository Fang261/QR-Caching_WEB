const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_foto: String,
    post_text: String,
    post_date: { type: Date, default: null}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
