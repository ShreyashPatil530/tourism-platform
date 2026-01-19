import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const destinationsPath = path.join(process.cwd(), 'data', 'destinations.json')
        const destinationsData = fs.readFileSync(destinationsPath, 'utf-8')
        const destinations = JSON.parse(destinationsData)

        return NextResponse.json(destinations)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
    }
}
