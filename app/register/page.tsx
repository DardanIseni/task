'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleRegister() {
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) { setError(error.message); setLoading(false) }
        else router.push('/dashboard')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <div className="w-full max-w-sm">

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Create your account
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Start discovering people with shared interests
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleRegister()}
                        className="h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
                    />

                    {error && (
                        <p className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 px-4 py-2 text-xs text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="h-11 w-full rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-zinc-900 dark:text-zinc-50 font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}