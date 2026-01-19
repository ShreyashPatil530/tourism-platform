import { NextResponse } from 'next/server';
import { getCollection, addDocument } from '@/lib/firebase/firestore';

export async function GET() {
    try {
        const blogs = await getCollection('blogs');
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Verify admin token (simple check - in production use proper JWT verification)
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (token !== 'admin-token-secret') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Create new blog
        const newBlog = {
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            image: body.image,
            content: body.content,
            date: new Date().toISOString().split('T')[0],
            author: body.author || 'Admin',
        };

        const blog = await addDocument('blogs', newBlog);

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
