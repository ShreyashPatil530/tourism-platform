import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request, { params }) {
    try {
        const { slug } = params
        const destinationsPath = path.join(process.cwd(), 'data', 'destinations.json')
        const destinationsData = fs.readFileSync(destinationsPath, 'utf-8')
        const destinations = JSON.parse(destinationsData)

        const destination = destinations.find(d => d.slug === slug)

        if (!destination) {
            return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
        }

        return NextResponse.json(destination)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 })
    }
}
