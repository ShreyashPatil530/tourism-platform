const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: Date, required: true },
    message: { type: String },
    packageName: { type: String },
    status: { type: String, default: 'pending' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
