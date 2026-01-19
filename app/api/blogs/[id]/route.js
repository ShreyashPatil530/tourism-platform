import { NextResponse } from 'next/server';
import { getDocument, updateDocument, deleteDocument } from '@/lib/firebase/firestore';

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const blog = await getDocument('blogs', id);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        // Verify admin token
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (token !== 'admin-token-secret') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Update blog
        const updateData = {
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            image: body.image,
            content: body.content,
            author: body.author,
        };

        await updateDocument('blogs', id, updateData);

        return NextResponse.json({ id, ...updateData });
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // Verify admin token
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (token !== 'admin-token-secret') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await deleteDocument('blogs', id);

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
