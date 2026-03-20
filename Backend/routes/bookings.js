const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, guests, date, message, packageName } = req.body;

        const booking = await Booking.create({
            name,
            email,
            phone,
            guests,
            date,
            message,
            packageName
        });

        res.status(201).json({
            success: true,
            booking,
            message: 'Booking request submitted successfully! We will contact you soon.'
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit booking. Please try again later.',
            error: error.message
        });
    }
});

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
