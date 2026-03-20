import Hero from '@/components/home/Hero'
import Destinations from '@/components/home/Destinations'
import Packages from '@/components/home/Packages'
import WhyChooseUs from '@/components/home/WhyChooseUs'

export const metadata = {
    title: 'Premium Tourism - Discover the World',
    description: 'Premium travel experiences crafted for modern explorers. Explore stunning destinations, luxury tour packages, and Travel blogs.',
    keywords: 'tourism, travel, destinations, tour packages, luxury travel, vacation',
}

export default function Home() {
    return (
        <>
            <Hero />
            <Destinations />
            <Packages />
            <WhyChooseUs />
        </>
    )
}
