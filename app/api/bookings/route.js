import { NextResponse } from 'next/server';
import { getCollection, addDocument } from '@/lib/firebase/firestore';

export async function POST(request) {
    try {
        const body = await request.json();

        // Create new booking
        const newBooking = {
            packageName: body.packageName,
            name: body.name,
            email: body.email,
            phone: body.phone,
            guests: body.guests,
            date: body.date,
            message: body.message || '',
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        const booking = await addDocument('bookings', newBooking);

        return NextResponse.json({
            success: true,
            booking: booking,
            message: 'Booking request submitted successfully! We will contact you soon.'
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const bookings = await getCollection('bookings');
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}
