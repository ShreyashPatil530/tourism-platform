const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number },
    location: { type: String },
    rating: { type: Number, default: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Destination', destinationSchema);
