'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('/api/blogs')
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error('Error fetching blogs:', err))
    }, [])

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 lg:px-8">
            <div className="container mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Travel <span className="text-gradient">Blogs</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Stories, guides, and inspiration for your next adventure
                    </p>
                </motion.div>

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/blogs/${blog.slug}`}>
                                <Card className="overflow-hidden group cursor-pointer h-full">
                                    {/* Image */}
                                    <div className="relative h-56 -m-6 mb-4 overflow-hidden rounded-t-2xl">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${blog.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-2">
                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(blog.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-1" />
                                                {blog.author}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                                            {blog.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>

                                        {/* Read More */}
                                        <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {blogs.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No blogs found. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
