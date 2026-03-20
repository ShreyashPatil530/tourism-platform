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

        // Validation
        if (formData.name.trim().length < 3) {
            setError('Please enter your full name (at least 3 characters).')
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return
        }

        // Phone validation (exactly 10 digits)
        const cleanPhone = formData.phone.replace(/\D/g, '')
        if (cleanPhone.length !== 10) {
            setError('Please enter a valid 10-digit phone number.')
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return
        }

        // Date validation (must be today or in the future)
        const selectedDate = new Date(formData.date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (selectedDate < today) {
            setError('Please select a travel date that is today or in the future.')
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return
        }

        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    packageName: packageName || destinationName,
                }),
            })

            // Fix for "Unexpected token <" error: check response.ok before parsing JSON
            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'Booking failed';
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `Server Error (${response.status}). Please check if the backend is running.`;
                }
                setError(errorMessage);
                return;
            }

            const data = await response.json()

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
        } catch (err) {
            console.error('Booking fetch error:', err);
            setError('An error occurred. Please check your connection and try again.');
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
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, phone: value });
                }}
                required
                pattern="[0-9]{10}"
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
