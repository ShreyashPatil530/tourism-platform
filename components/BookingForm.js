'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Send } from 'lucide-react'

export default function BookingForm({ destinationName, packageName }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        guests: '2',
        date: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    packageName: packageName || destinationName,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    guests: '2',
                    date: '',
                    message: '',
                })
                setTimeout(() => setSuccess(false), 5000)
            } else {
                setError(data.error || 'Booking failed')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-400 text-sm">
                    ✓ Booking request submitted! We'll contact you soon.
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />

            <Input
                label="Phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Guests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    required
                />

                <Input
                    label="Travel Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message (Optional)
                </label>
                <textarea
                    className="w-full glass glass-hover px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px]"
                    placeholder="Any special requests or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            <Button type="submit" className="w-full group" disabled={loading}>
                {loading ? 'Submitting...' : (
                    <>
                        <Send className="inline-block mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Request Booking
                    </>
                )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
                We'll contact you within 24 hours to confirm your booking
            </p>
        </form>
    )
}
