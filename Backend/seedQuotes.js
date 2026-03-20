const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');

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

const blogs = [
    {
        title: "Top 10 Hidden Gems in Bali",
        slug: "top-10-hidden-gems-bali",
        excerpt: "Discover the untouched beauty of Bali beyond the tourist traps.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        content: "Bali is known for its popular beaches and temples, but there's so much more to explore...",
        author: "Travel Pro"
    },
    {
        title: "A Guide to Hiking the Swiss Alps",
        slug: "guide-hiking-swiss-alps",
        excerpt: "Everything you need to know before tackling the majestic Alps.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        content: "The Swiss Alps offer some of the most breathtaking hiking trails in the world...",
        author: "Adventure Seeker"
    },
    {
        title: "Paris on a Budget: Is it Possible?",
        slug: "paris-on-a-budget",
        excerpt: "How to enjoy the City of Lights without breaking the bank.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        content: "Paris has a reputation for being expensive, but with these tips, you can save money...",
        author: "Budget Traveler"
    },
    {
        title: "Luxury Escapes in the Maldives",
        slug: "luxury-escapes-maldives",
        excerpt: "Experience the pinnacle of relaxation in these overwater villas.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        content: "If you're looking for the ultimate luxury vacation, look no further than the Maldives...",
        author: "Luxury Life"
    },
    {
        title: "Tokyo: A Cyberpunk Reality",
        slug: "tokyo-cyberpunk-reality",
        excerpt: "Exploring the neon-lit streets and futuristic tech of Tokyo.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        content: "Tokyo is a city of contrasts, where ancient shrines stand next to modern skyscrapers...",
        author: "Tech Explorer"
    }
];

const seedBlogs = async () => {
    await connectDB();
    try {
        await Blog.deleteMany(); // Clear existing blogs
        await Blog.insertMany(blogs);
        console.log('Blogs seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
};

seedBlogs();
