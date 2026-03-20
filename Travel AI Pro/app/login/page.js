"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tourism-backend-vs0z.onrender.com';
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-96 bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50 rounded-3xl" />

                <div className="relative glass border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-slate-900/50">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 mt-2">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-[38px] w-5 h-5 text-gray-400 z-10" />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-[38px] w-5 h-5 text-gray-400 z-10" />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden group btn-gradient"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <span className="relative z-10">Sign In</span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
