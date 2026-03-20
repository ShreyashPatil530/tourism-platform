'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Plus, Edit, Trash2, LogOut, BookOpen, Users, MapPin, CheckCircle, XCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tourism-backend-vs0z.onrender.com';

export default function AdminDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('blogs')
    
    // Blogs State
    const [blogs, setBlogs] = useState([])
    const [isEditingBlog, setIsEditingBlog] = useState(false)
    const [editingBlog, setEditingBlog] = useState(null)
    const [blogFormData, setBlogFormData] = useState({
        title: '', slug: '', excerpt: '', image: '', content: '', author: 'Admin'
    })

    // Bookings State
    const [bookings, setBookings] = useState([])

    // Packages (Destinations) State
    const [packages, setPackages] = useState([])
    const [isEditingPackage, setIsEditingPackage] = useState(false)
    const [editingPackage, setEditingPackage] = useState(null)
    const [packageFormData, setPackageFormData] = useState({
        name: '', slug: '', description: '', image: '', price: '', location: '', rating: 5
    })

    // Registered Users State
    const [users, setUsers] = useState([])

    // Inquiries (Contact) State
    const [inquiries, setInquiries] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/admin/login')
            return
        }

        fetchBlogs()
        fetchBookings()
        fetchPackages()
        fetchUsers()
        fetchInquiries()
    }, [router])

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs`)
            if (!response.ok) throw new Error(`Status: ${response.status}`)
            const data = await response.json()
            setBlogs(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching blogs:', error)
        }
    }

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${API_URL}/api/bookings`)
            if (!response.ok) throw new Error(`Status: ${response.status}`)
            const data = await response.json()
            setBookings(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching bookings:', error)
        }
    }

    const fetchPackages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/destinations`)
            if (!response.ok) throw new Error(`Status: ${response.status}`)
            const data = await response.json()
            setPackages(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching packages:', error)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/users`)
            if (!response.ok) throw new Error(`Status: ${response.status}`)
            const data = await response.json()
            setUsers(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const fetchInquiries = async () => {
        try {
            const response = await fetch(`${API_URL}/api/contact`)
            if (!response.ok) throw new Error(`Status: ${response.status}`)
            const data = await response.json()
            setInquiries(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching inquiries:', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/admin/login')
    }

    // --- Blog Handlers ---
    const handleBlogSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            const url = editingBlog ? `${API_URL}/api/blogs/${editingBlog._id}` : `${API_URL}/api/blogs`
            const method = editingBlog ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(blogFormData),
            })

            if (response.ok) {
                alert(editingBlog ? 'Blog updated!' : 'Blog created!')
                setBlogFormData({ title: '', slug: '', excerpt: '', image: '', content: '', author: 'Admin' })
                setIsEditingBlog(false)
                setEditingBlog(null)
                fetchBlogs()
            }
        } catch (error) { console.error('Error saving blog:', error) }
    }

    const handleBlogDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (response.ok) fetchBlogs()
        } catch (error) { console.error('Error deleting blog:', error) }
    }

    // --- Package Handlers ---
    const handlePackageSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            const url = editingPackage ? `${API_URL}/api/destinations/${editingPackage._id}` : `${API_URL}/api/destinations`
            const method = editingPackage ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(packageFormData),
            })

            if (response.ok) {
                alert(editingPackage ? 'Package updated!' : 'Package created!')
                setPackageFormData({ name: '', slug: '', description: '', image: '', price: '', location: '', rating: 5 })
                setIsEditingPackage(false)
                setEditingPackage(null)
                fetchPackages()
            }
        } catch (error) { console.error('Error saving package:', error) }
    }

    const handlePackageDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this package?')) return
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`${API_URL}/api/destinations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (response.ok) fetchPackages()
        } catch (error) { console.error('Error deleting package:', error) }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Admin <span className="text-gradient">Dashboard</span>
                        </h1>
                        <p className="text-gray-400">Manage your entire tourism platform</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 glass p-2 rounded-2xl w-full md:w-fit overflow-x-auto whitespace-nowrap">
                    {[
                        { id: 'blogs', label: 'Blogs', icon: BookOpen },
                        { id: 'bookings', label: 'Bookings', icon: CheckCircle },
                        { id: 'packages', label: 'Packages', icon: MapPin },
                        { id: 'users', label: 'Users', icon: Users },
                        { id: 'inquiries', label: 'Inquiries', icon: Plus },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-3 rounded-xl transition-all ${
                                activeTab === tab.id 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <tab.icon className="w-5 h-5 mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in duration-500">
                    {/* --- Blogs Content --- */}
                    {activeTab === 'blogs' && (
                        <div className="space-y-8">
                            {/* Blog Form */}
                            <div className="glass rounded-2xl p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">
                                        {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                                    </h2>
                                    {isEditingBlog && (
                                        <Button variant="ghost" onClick={() => { setIsEditingBlog(false); setEditingBlog(null); }}>
                                            Cancel
                                        </Button>
                                    )}
                                    {!isEditingBlog && (
                                        <Button onClick={() => setIsEditingBlog(true)}>
                                            <Plus className="w-5 h-5 mr-2" />
                                            New Blog
                                        </Button>
                                    )}
                                </div>
                                {isEditingBlog && (
                                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Title" value={blogFormData.title} onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })} required />
                                            <Input label="Slug" value={blogFormData.slug} onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })} required />
                                        </div>
                                        <Input label="Image URL" value={blogFormData.image} onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })} required />
                                        <textarea className="w-full glass p-4 rounded-xl text-white outline-none min-h-[100px]" placeholder="Excerpt..." value={blogFormData.excerpt} onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })} required />
                                        <textarea className="w-full glass p-4 rounded-xl text-white font-mono outline-none min-h-[200px]" placeholder="Blog Content (Markdown)..." value={blogFormData.content} onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })} required />
                                        <Button type="submit" className="w-full">{editingBlog ? 'Update Blog' : 'Create Blog'}</Button>
                                    </form>
                                )}
                            </div>
                            {/* Blogs List */}
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-2xl font-bold mb-6">All Blogs ({blogs.length})</h2>
                                <div className="space-y-4">
                                    {blogs.map(blog => (
                                        <div key={blog._id} className="glass glass-hover rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-20 h-20 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${blog.image})` }} />
                                                <div>
                                                    <h3 className="font-bold text-lg">{blog.title}</h3>
                                                    <p className="text-gray-400 text-sm line-clamp-1">{blog.excerpt}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button onClick={() => { setEditingBlog(blog); setBlogFormData(blog); setIsEditingBlog(true); }} className="glass p-3 rounded-xl text-blue-400 hover:bg-blue-400/10"><Edit className="w-5 h-5" /></button>
                                                <button onClick={() => handleBlogDelete(blog._id)} className="glass p-3 rounded-xl text-red-400 hover:bg-red-400/10"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Bookings Content --- */}
                    {activeTab === 'bookings' && (
                        <div className="glass rounded-2xl p-8 overflow-hidden">
                            <h2 className="text-2xl font-bold mb-6">User Bookings ({bookings.length})</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10 text-left">
                                            <th className="pb-4 pt-2 font-semibold">User Details</th>
                                            <th className="pb-4 pt-2 font-semibold">Package</th>
                                            <th className="pb-4 pt-2 font-semibold">Date</th>
                                            <th className="pb-4 pt-2 font-semibold">Guests</th>
                                            <th className="pb-4 pt-2 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {bookings.map(booking => (
                                            <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                                                <td className="py-4">
                                                    <p className="font-bold">{booking.name}</p>
                                                    <p className="text-xs text-gray-400">{booking.email}</p>
                                                    <p className="text-xs text-gray-400">{booking.phone}</p>
                                                </td>
                                                <td className="py-4 text-blue-400 font-medium">{booking.packageName || 'Any Package'}</td>
                                                <td className="py-4 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                                                <td className="py-4 text-sm">{booking.guests} Guests</td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        booking.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- Packages Content --- */}
                    {activeTab === 'packages' && (
                        <div className="space-y-8">
                            {/* Package Form */}
                            <div className="glass rounded-2xl p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
                                    {isEditingPackage && <Button variant="ghost" onClick={() => { setIsEditingPackage(false); setEditingPackage(null); }}>Cancel</Button>}
                                    {!isEditingPackage && <Button onClick={() => setIsEditingPackage(true)}><Plus className="w-5 h-5 mr-2" />New Package</Button>}
                                </div>
                                {isEditingPackage && (
                                    <form onSubmit={handlePackageSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Package Name" value={packageFormData.name} onChange={(e) => setPackageFormData({ ...packageFormData, name: e.target.value })} required />
                                            <Input label="Slug" value={packageFormData.slug} onChange={(e) => setPackageFormData({ ...packageFormData, slug: e.target.value })} required />
                                            <Input label="Price (₹)" type="number" value={packageFormData.price} onChange={(e) => setPackageFormData({ ...packageFormData, price: e.target.value })} required />
                                            <Input label="Location" value={packageFormData.location} onChange={(e) => setPackageFormData({ ...packageFormData, location: e.target.value })} required />
                                        </div>
                                        <Input label="Image URL" value={packageFormData.image} onChange={(e) => setPackageFormData({ ...packageFormData, image: e.target.value })} required />
                                        <textarea className="w-full glass p-4 rounded-xl text-white outline-none min-h-[100px]" placeholder="Description..." value={packageFormData.description} onChange={(e) => setPackageFormData({ ...packageFormData, description: e.target.value })} required />
                                        <Button type="submit" className="w-full">{editingPackage ? 'Update Package' : 'Create Package'}</Button>
                                    </form>
                                )}
                            </div>
                            {/* Packages List */}
                            <div className="glass rounded-2xl p-8">
                                <h2 className="text-2xl font-bold mb-6">All Packages ({packages.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {packages.map(pkg => (
                                        <div key={pkg._id} className="glass glass-hover rounded-xl p-4">
                                            <div className="w-full h-40 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: `url(${pkg.image})` }} />
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg">{pkg.name}</h3>
                                                <span className="text-blue-400 font-bold">₹{pkg.price}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{pkg.description}</p>
                                            <div className="flex space-x-2">
                                                <button onClick={() => { setEditingPackage(pkg); setPackageFormData(pkg); setIsEditingPackage(true); }} className="flex-1 glass glass-hover py-2 rounded-lg text-blue-400 text-sm flex justify-center items-center"><Edit className="w-4 h-4 mr-2" />Edit</button>
                                                <button onClick={() => handlePackageDelete(pkg._id)} className="flex-1 glass glass-hover py-2 rounded-lg text-red-400 text-sm flex justify-center items-center"><Trash2 className="w-4 h-4 mr-2" />Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Users Content --- */}
                    {activeTab === 'users' && (
                        <div className="glass rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-6">Registered Users ({users.length})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
                                {users.map(user => (
                                    <div key={user._id} className="glass p-6 rounded-xl flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">{user.email[0].toUpperCase()}</div>
                                        <div>
                                            <p className="font-bold">{user.email}</p>
                                            <p className="text-xs text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 uppercase font-bold">{user.role}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Inquiries Content --- */}
                    {activeTab === 'inquiries' && (
                        <div className="glass rounded-2xl p-8 overflow-hidden">
                            <h2 className="text-2xl font-bold mb-6 text-white">Inquiries ({inquiries.length})</h2>
                            <div className="space-y-4">
                                {inquiries.map(inquiry => (
                                    <div key={inquiry._id} className="glass p-6 rounded-xl text-white">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold">{inquiry.subject}</h3>
                                                <p className="text-sm text-gray-400">From: {inquiry.name} ({inquiry.email})</p>
                                            </div>
                                            <span className="text-xs text-gray-500">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm mt-4 p-4 glass bg-white/5 rounded-lg italic">"{inquiry.message}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
