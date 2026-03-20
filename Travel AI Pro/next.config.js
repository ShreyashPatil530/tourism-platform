/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'images.unsplash.com', 'localhost:5000', 'tourism-backend-vs0z.onrender.com'],
        unoptimized: true,
    },
}

module.exports = nextConfig
