import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Premium Tourism - Discover the World',
    description: 'Premium travel experiences crafted for modern explorers',
    keywords: 'tourism, travel, destinations, tour packages, luxury travel',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
