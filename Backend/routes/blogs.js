const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Get single blog
// @route   GET /api/blogs/:slug
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
router.post('/', async (req, res) => {
    try {
        console.log('Incoming blog creation request:', req.body);
        const blog = await Blog.create(req.body);
        console.log('Blog created successfully:', blog._id);
        res.status(201).json(blog);
    } catch (error) {
        console.error('Create blog error details:', error);
        res.status(400).json({
            message: 'Invalid data',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
router.put('/:id', async (req, res) => {
    try {
        console.log(`Updating blog ${req.params.id} with:`, req.body);
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Update blog error details:', error);
        res.status(400).json({
            message: 'Invalid data',
            error: error.message
        });
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
