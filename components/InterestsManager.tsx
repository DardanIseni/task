'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Interest = { id: string; tag: string }

export default function InterestsManager({
                                             userId, initialInterests
                                         }: { userId: string; initialInterests: Interest[] }) {
    const [interests, setInterests] = useState(initialInterests)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    async function addInterest() {
        const tag = input.trim().toLowerCase()
        if (!tag || interests.some(i => i.tag === tag)) return
        setLoading(true)
        const { data, error } = await supabase
            .from('interests')
            .insert({ user_id: userId, tag })
            .select()
            .single()
        if (!error && data) {
            setInterests(prev => [data, ...prev])
            setInput('')
            router.refresh()
        }
        setLoading(false)
    }

    async function removeInterest(id: string) {
        await supabase.from('interests').delete().eq('id', id)
        setInterests(prev => prev.filter(i => i.id !== id))
        router.refresh()
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addInterest()}
                    placeholder="e.g. hiking, jazz, rust, chess..."
                    className="h-11 flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition"
                />
                <button
                    onClick={addInterest}
                    disabled={loading}
                    className="h-11 rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-5 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-40 transition-colors"
                >
                    Add
                </button>
            </div>

            {interests.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-600">
                    No interests yet — add something above.
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {interests.map(i => (
                        <span
                            key={i.id}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300"
                        >
              {i.tag}
                            <button
                                onClick={() => removeInterest(i.id)}
                                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors leading-none"
                            >
                ×
              </button>
            </span>
                    ))}
                </div>
            )}
        </div>
    )
}