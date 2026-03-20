'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Award, Headphones } from 'lucide-react'

export default function WhyChooseUs() {
    const features = [
        {
            icon: Zap,
            title: 'Fast Booking',
            description: 'Quick and easy booking process with instant confirmation',
        },
        {
            icon: Shield,
            title: 'Secure Payments',
            description: 'Your transactions are protected with enterprise-grade security',
        },
        {
            icon: Award,
            title: 'Premium Experience',
            description: 'Handpicked destinations and luxury accommodations',
        },
        {
            icon: Headphones,
            title: '24/7 Support',
            description: 'Round-the-clock customer service for your peace of mind',
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
                        Why <span className="text-gradient">Choose Us</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Experience the difference with our premium travel services
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="glass glass-hover rounded-2xl p-8 text-center group"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
