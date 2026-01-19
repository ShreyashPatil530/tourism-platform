import { NextResponse } from 'next/server';
import { getDocumentsByField } from '@/lib/firebase/firestore';

export async function GET(request, { params }) {
    try {
        const { slug } = params;
        const destinations = await getDocumentsByField('destinations', 'slug', slug);

        if (!destinations || destinations.length === 0) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
        }

        return NextResponse.json(destinations[0]);
    } catch (error) {
        console.error('Error fetching destination:', error);
        return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
    }
}
