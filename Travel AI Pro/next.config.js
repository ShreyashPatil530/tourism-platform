/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'images.unsplash.com', 'localhost:5000', 'travel-ai-pro-backend.onrender.com'],
        unoptimized: true,
    },
}

module.exports = nextConfig
