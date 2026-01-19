'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Plus, Edit, Trash2, LogOut, BookOpen } from 'lucide-react'

export default function AdminDashboard() {
    const router = useRouter()
    const [blogs, setBlogs] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingBlog, setEditingBlog] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        image: '',
        content: '',
        author: 'Admin',
    })

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('admin-token')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchBlogs()
    }, [router])

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs')
            const data = await response.json()
            setBlogs(data)
        } catch (error) {
            console.error('Error fetching blogs:', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin-token')
        localStorage.removeItem('admin-user')
        router.push('/admin/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('admin-token')

        try {
            const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs'
            const method = editingBlog ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                alert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!')
                setFormData({ title: '', slug: '', excerpt: '', image: '', content: '', author: 'Admin' })
                setIsEditing(false)
                setEditingBlog(null)
                fetchBlogs()
            } else {
                alert('Failed to save blog')
            }
        } catch (error) {
            console.error('Error saving blog:', error)
            alert('An error occurred')
        }
    }

    const handleEdit = (blog) => {
        setEditingBlog(blog)
        setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            image: blog.image,
            content: blog.content,
            author: blog.author,
        })
        setIsEditing(true)
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return

        const token = localStorage.getItem('admin-token')

        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (response.ok) {
                alert('Blog deleted successfully!')
                fetchBlogs()
            } else {
                alert('Failed to delete blog')
            }
        } catch (error) {
            console.error('Error deleting blog:', error)
            alert('An error occurred')
        }
    }

    const cancelEdit = () => {
        setIsEditing(false)
        setEditingBlog(null)
        setFormData({ title: '', slug: '', excerpt: '', image: '', content: '', author: 'Admin' })
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Admin <span className="text-gradient">Dashboard</span>
                        </h1>
                        <p className="text-gray-400">Manage your travel blogs</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Add/Edit Blog Form */}
                <div className="glass rounded-2xl p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                        </h2>
                        {isEditing && (
                            <Button variant="ghost" onClick={cancelEdit}>
                                Cancel
                            </Button>
                        )}
                        {!isEditing && (
                            <Button onClick={() => setIsEditing(true)}>
                                <Plus className="w-5 h-5 mr-2" />
                                New Blog
                            </Button>
                        )}
                    </div>

                    {isEditing && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Title"
                                    type="text"
                                    placeholder="Blog title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Slug"
                                    type="text"
                                    placeholder="blog-url-slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                />
                            </div>
                            <Input
                                label="Image URL"
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    className="w-full glass glass-hover px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]"
                                    placeholder="Brief description..."
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Content (Markdown supported)
                                </label>
                                <textarea
                                    className="w-full glass glass-hover px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[200px] font-mono text-sm"
                                    placeholder="Write your blog content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {editingBlog ? 'Update Blog' : 'Create Blog'}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Blogs List */}
                <div className="glass rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
                        All Blogs ({blogs.length})
                    </h2>

                    {blogs.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No blogs yet. Create your first one!</p>
                    ) : (
                        <div className="space-y-4">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="glass glass-hover rounded-xl p-6 flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-4 flex-1">
                                        <div
                                            className="w-20 h-20 bg-cover bg-center rounded-xl"
                                            style={{ backgroundImage: `url(${blog.image})` }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-1">{blog.excerpt}</p>
                                            <p className="text-gray-500 text-xs mt-1">{blog.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="glass glass-hover p-3 rounded-xl text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="glass glass-hover p-3 rounded-xl text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
