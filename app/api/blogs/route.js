import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
        const blogsData = fs.readFileSync(blogsPath, 'utf-8')
        const blogs = JSON.parse(blogsData)

        return NextResponse.json(blogs)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()

        // Verify admin token (simple check - in production use proper JWT verification)
        const token = request.headers.get('Authorization')?.replace('Bearer ', '')
        if (token !== 'admin-token-secret') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
        const blogsData = fs.readFileSync(blogsPath, 'utf-8')
        const blogs = JSON.parse(blogsData)

        // Create new blog
        const newBlog = {
            id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            image: body.image,
            content: body.content,
            date: new Date().toISOString().split('T')[0],
            author: body.author || 'Admin',
        }

        blogs.push(newBlog)
        fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2))

        return NextResponse.json(newBlog, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
    }
}
