'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { MapPin } from 'lucide-react'

export default function Destinations() {
    const destinations = [
        {
            name: 'Bali, Indonesia',
            slug: 'bali-indonesia',
            description: 'Tropical paradise with temples and beaches',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        },
        {
            name: 'Swiss Alps',
            slug: 'swiss-alps',
            description: 'Majestic mountains and luxury resorts',
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
        },
        {
            name: 'Paris, France',
            slug: 'paris-france',
            description: 'City of lights and romance',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
        },
        {
            name: 'Maldives',
            slug: 'maldives',
            description: 'Crystal clear waters and overwater villas',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
        },
        {
            name: 'Tokyo, Japan',
            slug: 'tokyo-japan',
            description: 'Modern metropolis meets tradition',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
        },
        {
            name: 'Santorini, Greece',
            slug: 'santorini-greece',
            description: 'Iconic white buildings and blue domes',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
        },
    ]

    return (
        <section className="py-20 px-4 lg:px-8 bg-dark-800">
            <div className="container mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Popular <span className="text-gradient">Destinations</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore the most breathtaking destinations around the world
                    </p>
                </motion.div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((destination, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/destinations/${destination.slug}`}>
                                <Card className="overflow-hidden group cursor-pointer">
                                    {/* Image */}
                                    <div className="relative h-64 -m-6 mb-4 overflow-hidden rounded-t-2xl">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${destination.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

                                        {/* Overlay Badge */}
                                        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
                                            <span className="text-xs font-semibold">Featured</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-2">
                                        <div className="flex items-center text-blue-400 mb-2">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span className="text-sm font-medium">Destination</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{destination.name}</h3>
                                        <p className="text-gray-400 mb-4">{destination.description}</p>
                                        <div className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors flex items-center">
                                            Explore Now
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
