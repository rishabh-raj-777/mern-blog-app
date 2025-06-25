const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, image } = req.body; // ✅ include image
  const post = new Post({ title, content, image }); // ✅ include image
  await post.save();
  res.json(post);
});

// Update a post
router.put('/:id', async (req, res) => {
  const { title, content, image } = req.body; // ✅ include image
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, image }, // ✅ include image
    { new: true }
  );
  res.json(post);
});

// Delete a post
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
