const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const createAdmin = async () => {
    await connectDB();
    try {
        const adminEmail = 'admin@tourism.com';
        const adminPassword = 'admin123';

        // Check if admin exists
        let admin = await User.findOne({ email: adminEmail });
        if (admin) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create admin
        admin = new User({
            email: adminEmail,
            // Password will be hashed by pre-save hook in User model
            password: adminPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
