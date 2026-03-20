'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { MapPin, Star } from 'lucide-react'

export default function DestinationsPage() {
    const destinations = [
        {
            name: 'Bali, Indonesia',
            slug: 'bali-indonesia',
            description: 'Experience the magical blend of culture, nature, and spirituality',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            rating: 4.9,
            tours: 24,
        },
        {
            name: 'Swiss Alps',
            slug: 'swiss-alps',
            description: 'Breathtaking mountain scenery and world-class skiing',
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
            rating: 4.8,
            tours: 18,
        },
        {
            name: 'Paris, France',
            slug: 'paris-france',
            description: 'The epitome of romance, art, and culinary excellence',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            rating: 4.9,
            tours: 32,
        },
        {
            name: 'Maldives',
            slug: 'maldives',
            description: 'Paradise on earth with pristine beaches and luxury resorts',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
            rating: 5.0,
            tours: 15,
        },
        {
            name: 'Tokyo, Japan',
            slug: 'tokyo-japan',
            description: 'Where ancient tradition meets cutting-edge technology',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
            rating: 4.8,
            tours: 28,
        },
        {
            name: 'Santorini, Greece',
            slug: 'santorini-greece',
            description: 'Iconic sunsets and stunning Aegean Sea views',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
            rating: 4.9,
            tours: 20,
        },
        {
            name: 'Dubai, UAE',
            slug: 'dubai-uae',
            description: 'Luxury shopping, ultramodern architecture, and desert adventures',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
            rating: 4.7,
            tours: 26,
        },
        {
            name: 'New York, USA',
            slug: 'new-york-usa',
            description: 'The city that never sleeps with endless possibilities',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
            rating: 4.8,
            tours: 35,
        },
        {
            name: 'Machu Picchu, Peru',
            slug: 'machu-picchu-peru',
            description: 'Ancient Incan citadel set high in the Andes Mountains',
            image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
            rating: 4.9,
            tours: 12,
        },
    ]

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 lg:px-8">
            <div className="container mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Explore <span className="text-gradient">Destinations</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                        Discover the world's most beautiful destinations handpicked for unforgettable experiences
                    </p>
                </motion.div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/destinations/${destination.slug}`}>
                                <Card className="overflow-hidden group cursor-pointer h-full">
                                    {/* Image */}
                                    <div className="relative h-64 -m-6 mb-4 overflow-hidden rounded-t-2xl">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${destination.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

                                        {/* Rating Badge */}
                                        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                            <span className="text-sm font-semibold">{destination.rating}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-2">
                                        <div className="flex items-center text-blue-400 mb-2">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span className="text-sm font-medium">{destination.tours} Tours Available</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{destination.name}</h3>
                                        <p className="text-gray-400 mb-4">{destination.description}</p>
                                        <div className="btn-gradient w-full text-center py-2">
                                            View Details
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
