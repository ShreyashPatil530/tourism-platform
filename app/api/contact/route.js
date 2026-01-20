import { NextResponse } from 'next/server';
import { addDocument } from '@/lib/firebase/firestore';

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create new contact submission
        const newContact = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            status: 'new',
            createdAt: new Date().toISOString(),
        };

        const contact = await addDocument('contacts', newContact);

        return NextResponse.json({
            success: true,
            contact: contact,
            message: 'Thank you for your message! We will get back to you soon.'
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating contact submission:', error);
        return NextResponse.json({
            error: 'Failed to submit contact form. Please try again later.'
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { getCollection } = await import('@/lib/firebase/firestore');
        const contacts = await getCollection('contacts');
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json({
            error: 'Failed to fetch contacts'
        }, { status: 500 });
    }
}
