import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request, { params }) {
    try {
        const { id } = params
        const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
        const blogsData = fs.readFileSync(blogsPath, 'utf-8')
        const blogs = JSON.parse(blogsData)

        const blog = blogs.find(b => b.id === parseInt(id))

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json(blog)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const body = await request.json()

        // Verify admin token
        const token = request.headers.get('Authorization')?.replace('Bearer ', '')
        if (token !== 'admin-token-secret') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
        const blogsData = fs.readFileSync(blogsPath, 'utf-8')
        let blogs = JSON.parse(blogsData)

        const blogIndex = blogs.findIndex(b => b.id === parseInt(id))

        if (blogIndex === -1) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        // Update blog
        blogs[blogIndex] = {
            ...blogs[blogIndex],
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            image: body.image,
            content: body.content,
            author: body.author || blogs[blogIndex].author,
        }

        fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2))

        return NextResponse.json(blogs[blogIndex])
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params

        // Verify admin token
        const token = request.headers.get('Authorization')?.replace('Bearer ', '')
        if (token !== 'admin-token-secret') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
        const blogsData = fs.readFileSync(blogsPath, 'utf-8')
        let blogs = JSON.parse(blogsData)

        const blogIndex = blogs.findIndex(b => b.id === parseInt(id))

        if (blogIndex === -1) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        // Delete blog
        blogs.splice(blogIndex, 1)
        fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2))

        return NextResponse.json({ message: 'Blog deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
    }
}
