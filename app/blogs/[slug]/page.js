import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export async function generateStaticParams() {
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
    const blogsData = fs.readFileSync(blogsPath, 'utf-8')
    const blogs = JSON.parse(blogsData)

    return blogs.map((blog) => ({
        slug: blog.slug,
    }))
}

async function getBlog(slug) {
    const blogsPath = path.join(process.cwd(), 'data', 'blogs.json')
    const blogsData = fs.readFileSync(blogsPath, 'utf-8')
    const blogs = JSON.parse(blogsData)

    return blogs.find((blog) => blog.slug === slug)
}

export async function generateMetadata({ params }) {
    const blog = await getBlog(params.slug)

    if (!blog) {
        return {
            title: 'Blog Not Found',
        }
    }

    return {
        title: `${blog.title} - Premium Tourism`,
        description: blog.excerpt,
        keywords: 'travel blog, tourism, travel tips, destination guide',
    }
}

export default async function BlogDetailPage({ params }) {
    const blog = await getBlog(params.slug)

    if (!blog) {
        notFound()
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                {/* Back Button */}
                <Link href="/blogs" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Blogs
                </Link>

                {/* Hero Image */}
                <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${blog.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                </div>

                {/* Blog Header */}
                <div className="mb-8">
                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-gray-400 mb-4">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            {blog.author}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-300 leading-relaxed">{blog.excerpt}</p>
                </div>

                {/* Blog Content */}
                <div
                    className="prose prose-invert prose-lg max-w-none
            prose-headings:text-gradient prose-headings:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-white
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:my-1
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3"
                    dangerouslySetInnerHTML={{
                        __html: blog.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />')
                            .replace(/## (.*?)<br \/>/g, '<h2>$1</h2>')
                            .replace(/### (.*?)<br \/>/g, '<h3>$1</h3>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                />

                {/* CTA Section */}
                <div className="mt-16 glass rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start Your Adventure?</h3>
                    <p className="text-gray-400 mb-6">Explore our curated destinations and tour packages</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/destinations">
                            <Button>Browse Destinations</Button>
                        </Link>
                        <Link href="/packages">
                            <Button variant="outline">View Packages</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
