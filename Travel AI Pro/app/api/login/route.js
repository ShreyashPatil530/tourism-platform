import { NextResponse } from 'next/server'

const ADMIN_CREDENTIALS = {
    email: 'admin@tourism.com',
    password: 'admin123',
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            // In production, use proper JWT token generation
            return NextResponse.json({
                success: true,
                token: 'admin-token-secret',
                user: { email },
            })
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 })
    }
}
