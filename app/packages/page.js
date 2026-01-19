'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import BookingForm from '@/components/BookingForm'
import { Check, Clock, MapPin, Users, X } from 'lucide-react'

export default function PackagesPage() {
    const [selectedPackage, setSelectedPackage] = useState(null)

    const packages = [
        {
            name: 'Bali Explorer',
            destination: 'Bali, Indonesia',
            duration: '5 Days / 4 Nights',
            groupSize: '2-8 People',
            price: '$999',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
            features: [
                '4-star beachfront hotel',
                'Daily breakfast & 3 dinners',
                'Temple tours & cultural experiences',
                'Surfing lessons',
                'Airport transfers',
                'English speaking guide',
            ],
        },
        {
            name: 'Alpine Adventure',
            destination: 'Swiss Alps',
            duration: '7 Days / 6 Nights',
            groupSize: '2-6 People',
            price: '$2,499',
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
            features: [
                '5-star mountain resort',
                'All meals included',
                'Ski passes & equipment',
                'Mountain trekking expeditions',
                'Spa & wellness access',
                'Private transfers',
                'Professional instructor',
            ],
        },
        {
            name: 'Paris Romance',
            destination: 'Paris, France',
            duration: '4 Days / 3 Nights',
            groupSize: '2 People',
            price: '$1,799',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
            features: [
                'Luxury boutique hotel',
                'Gourmet dining experiences',
                'Eiffel Tower priority access',
                'Seine river cruise',
                'Louvre museum tour',
                'Champagne tasting',
            ],
        },
        {
            name: 'Maldives Paradise',
            destination: 'Maldives',
            duration: '6 Days / 5 Nights',
            groupSize: '2-4 People',
            price: '$3,999',
            image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
            features: [
                'Overwater villa accommodation',
                'All-inclusive dining',
                'Private speedboat transfers',
                'Snorkeling & diving trips',
                'Couples spa treatments',
                'Sunset dolphin cruise',
                'Water sports activities',
            ],
        },
        {
            name: 'Tokyo Explorer',
            destination: 'Tokyo, Japan',
            duration: '6 Days / 5 Nights',
            groupSize: '2-10 People',
            price: '$1,899',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
            features: [
                '4-star city center hotel',
                'Daily breakfast',
                'Bullet train day trips',
                'Traditional tea ceremony',
                'Sumo wrestling experience',
                'Anime & manga tours',
                'Local guide',
            ],
        },
        {
            name: 'Santorini Escape',
            destination: 'Santorini, Greece',
            duration: '5 Days / 4 Nights',
            groupSize: '2-6 People',
            price: '$1,599',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
            features: [
                'Cave hotel with caldera views',
                'Breakfast & 2 dinners included',
                'Wine tasting tours',
                'Sunset catamaran cruise',
                'Ancient ruins exploration',
                'Cooking class',
            ],
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
                        Tour <span className="text-gradient">Packages</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                        Carefully crafted itineraries for the perfect vacation experience
                    </p>
                </motion.div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="overflow-hidden h-full">
                                {/* Image */}
                                <div className="relative h-64 -m-6 mb-6 overflow-hidden rounded-t-2xl">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${pkg.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

                                    {/* Price Badge */}
                                    <div className="absolute bottom-4 right-4 bg-gradient-primary px-4 py-2 rounded-full">
                                        <span className="text-2xl font-bold">{pkg.price}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{pkg.name}</h3>
                                        <div className="flex items-center text-blue-400">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{pkg.destination}</span>
                                        </div>
                                    </div>

                                    {/* Info Badges */}
                                    <div className="flex flex-wrap gap-3">
                                        <div className="glass px-4 py-2 rounded-xl flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-blue-400" />
                                            <span className="text-sm">{pkg.duration}</span>
                                        </div>
                                        <div className="glass px-4 py-2 rounded-xl flex items-center">
                                            <Users className="w-4 h-4 mr-2 text-blue-400" />
                                            <span className="text-sm">{pkg.groupSize}</span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <div className="bg-blue-500/20 rounded-full p-1 mr-2 mt-0.5">
                                                    <Check className="w-3 h-3 text-blue-400" />
                                                </div>
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Button
                                        className="w-full"
                                        onClick={() => setSelectedPackage(pkg)}
                                    >
                                        Book This Package
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {selectedPackage && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPackage(null)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedPackage(null)}
                        >
                            <div
                                className="glass rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPackage(null)}
                                    className="absolute top-4 right-4 glass glass-hover p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Modal Header */}
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold mb-2">{selectedPackage.name}</h2>
                                    <p className="text-gray-400">{selectedPackage.destination}</p>
                                    <p className="text-2xl text-gradient font-bold mt-2">{selectedPackage.price}</p>
                                </div>

                                {/* Booking Form */}
                                <BookingForm packageName={selectedPackage.name} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
