import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-dark-800 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold text-gradient mb-4">TravelPro</h3>
                        <p className="text-gray-400 mb-4">
                            Premium travel experiences crafted for modern explorers. Discover the world in a new way.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                            <li><Link href="/packages" className="text-gray-400 hover:text-white transition-colors">Tour Packages</Link></li>
                            <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors">Travel Blogs</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bali, Indonesia</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Swiss Alps</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Paris, France</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Maldives</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span>info@travelpro.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>123 Travel Street, NY</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500">
                    <p>&copy; 2026 TravelPro. All rights reserved. Built with Shreyash Patil for explorers.</p>
                </div>
            </div>
        </footer>
    )
}
