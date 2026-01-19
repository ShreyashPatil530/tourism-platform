import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft, MapPin, Star, Calendar, DollarSign, Users, Check } from 'lucide-react'
import BookingForm from '@/components/BookingForm'

export async function generateStaticParams() {
    const destinationsPath = path.join(process.cwd(), 'data', 'destinations.json')
    const destinationsData = fs.readFileSync(destinationsPath, 'utf-8')
    const destinations = JSON.parse(destinationsData)

    return destinations.map((destination) => ({
        slug: destination.slug,
    }))
}

async function getDestination(slug) {
    const destinationsPath = path.join(process.cwd(), 'data', 'destinations.json')
    const destinationsData = fs.readFileSync(destinationsPath, 'utf-8')
    const destinations = JSON.parse(destinationsData)

    return destinations.find((destination) => destination.slug === slug)
}

export async function generateMetadata({ params }) {
    const destination = await getDestination(params.slug)

    if (!destination) {
        return {
            title: 'Destination Not Found',
        }
    }

    return {
        title: `${destination.name} - Premium Tourism`,
        description: destination.description,
        keywords: `${destination.name}, travel, tourism, vacation, ${destination.name} tours`,
    }
}

export default async function DestinationDetailPage({ params }) {
    const destination = await getDestination(params.slug)

    if (!destination) {
        notFound()
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                {/* Back Button */}
                <Link href="/destinations" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Destinations
                </Link>

                {/* Hero Image */}
                <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${destination.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-8 left-8">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="glass px-4 py-2 rounded-xl flex items-center">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                                <span className="font-bold">{destination.rating}</span>
                            </div>
                            <div className="glass px-4 py-2 rounded-xl flex items-center">
                                <MapPin className="w-5 h-5 text-blue-400 mr-2" />
                                <span>{destination.tours} Tours Available</span>
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold">{destination.name}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-3xl font-bold mb-4 text-gradient">About {destination.name}</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{destination.about}</p>
                        </div>

                        {/* Highlights */}
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-3xl font-bold mb-6 text-gradient">Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {destination.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <div className="bg-blue-500/20 rounded-full p-2 mr-3 mt-0.5">
                                            <Check className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-gray-300">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Info & Booking */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center text-blue-400 mb-1">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-semibold">Best Time to Visit</span>
                                    </div>
                                    <p className="text-gray-300 text-sm ml-6">{destination.bestTime}</p>
                                </div>
                                <div>
                                    <div className="flex items-center text-blue-400 mb-1">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-semibold">Currency</span>
                                    </div>
                                    <p className="text-gray-300 text-sm ml-6">{destination.currency}</p>
                                </div>
                                <div>
                                    <div className="flex items-center text-blue-400 mb-1">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-semibold">Language</span>
                                    </div>
                                    <p className="text-gray-300 text-sm ml-6">{destination.language}</p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">Book Your Trip</h3>
                            <BookingForm destinationName={destination.name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
