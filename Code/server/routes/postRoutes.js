const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Create a new post
router.post('/', async (req, res) => {
    try {
        console.log('Request received:', req.body); 
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(400).json({ message: error.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});

// Update a post
router.patch('/:id', getPost, async (req, res) => {
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.post = post;
    next();
}

module.exports = router;
