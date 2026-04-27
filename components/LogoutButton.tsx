'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const supabase = createClient()
    const router = useRouter()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
            Sign out
        </button>
    )
}