const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @desc    Submit a contact form
// @route   POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            contact: newContact,
            message: 'Thank you for your message! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({
            error: 'Failed to submit contact form. Please try again later.'
        });
    }
});

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

module.exports = router;
