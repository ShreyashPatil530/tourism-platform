'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Check } from 'lucide-react'

export default function Packages() {
    const packages = [
        {
            name: 'Explorer',
            price: '$999',
            duration: '5 Days',
            features: [
                '4-star Hotel Accommodation',
                'Daily Breakfast Included',
                'Airport Transfers',
                'City Tours',
                '24/7 Support',
            ],
            popular: false,
        },
        {
            name: 'Premium',
            price: '$1,999',
            duration: '7 Days',
            features: [
                '5-star Luxury Resort',
                'All Meals Included',
                'Private Transfers',
                'Exclusive Tours & Activities',
                'Spa & Wellness Access',
                'Personal Guide',
                '24/7 Concierge',
            ],
            popular: true,
        },
        {
            name: 'Ultimate',
            price: '$3,999',
            duration: '10 Days',
            features: [
                'Ultra-Luxury Resort',
                'Gourmet Dining Experience',
                'Private Jet Transfers',
                'VIP Experiences',
                'Unlimited Activities',
                'Personal Butler',
                'Priority Everything',
            ],
            popular: false,
        },
    ]

    return (
        <section className="py-20 px-4 lg:px-8">
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
                        Tour <span className="text-gradient">Packages</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose the perfect package for your next adventure
                    </p>
                </motion.div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="relative"
                        >
                            {/* Popular Badge */}
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="bg-gradient-primary px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <Card
                                className={`h-full ${pkg.popular ? 'border-2 border-blue-500 scale-105' : ''
                                    }`}
                            >
                                {/* Package Header */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                    <div className="text-5xl font-bold text-gradient mb-2">
                                        {pkg.price}
                                    </div>
                                    <p className="text-gray-400">{pkg.duration}</p>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className="bg-blue-500/20 rounded-full p-1 mr-3 mt-0.5">
                                                <Check className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Button
                                    variant={pkg.popular ? 'primary' : 'outline'}
                                    className="w-full"
                                >
                                    Book Now
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
