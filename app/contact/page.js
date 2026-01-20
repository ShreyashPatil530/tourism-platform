'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: '', message: '' })

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: data.message || 'Thank you for your message! We will get back to you soon.'
                })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.error || 'Failed to submit form. Please try again.'
                })
            }
        } catch (error) {
            console.error('Contact form error:', error)
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            info: 'info@travelpro.com',
        },
        {
            icon: Phone,
            title: 'Phone',
            info: '+1 (555) 123-4567',
        },
        {
            icon: MapPin,
            title: 'Address',
            info: '123 Travel Street, New York, NY 10001',
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
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {contactInfo.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card className="text-center">
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-2xl mb-4">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.info}</p>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Name"
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <Input
                                label="Subject"
                                type="text"
                                placeholder="How can we help?"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    className="w-full glass glass-hover px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[150px]"
                                    placeholder="Tell us more about your inquiry..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Status Message */}
                            {submitStatus.message && (
                                <div className={`p-4 rounded-xl ${submitStatus.type === 'success'
                                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                    }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full group"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="inline-block mr-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="inline-block mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
