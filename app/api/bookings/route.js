import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request) {
    try {
        const body = await request.json()

        const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json')
        const bookingsData = fs.readFileSync(bookingsPath, 'utf-8')
        const bookings = JSON.parse(bookingsData)

        // Create new booking
        const newBooking = {
            id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
            packageName: body.packageName,
            name: body.name,
            email: body.email,
            phone: body.phone,
            guests: body.guests,
            date: body.date,
            message: body.message || '',
            status: 'pending',
            createdAt: new Date().toISOString(),
        }

        bookings.push(newBooking)
        fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2))

        return NextResponse.json({
            success: true,
            booking: newBooking,
            message: 'Booking request submitted successfully! We will contact you soon.'
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json')
        const bookingsData = fs.readFileSync(bookingsPath, 'utf-8')
        const bookings = JSON.parse(bookingsData)

        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }
}
