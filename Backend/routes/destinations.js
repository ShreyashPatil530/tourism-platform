const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Get single destination
// @route   GET /api/destinations/:slug
router.get('/:slug', async (req, res) => {
    try {
        const destination = await Destination.findOne({ slug: req.params.slug });
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc    Add a destination (Admin only)
// @route   POST /api/destinations
router.post('/', async (req, res) => {
    try {
        const destination = await Destination.create(req.body);
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
});

// @desc    Update a destination
// @route   PUT /api/destinations/:id
router.put('/:id', async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!destination) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(destination);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
});

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
router.delete('/:id', async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
