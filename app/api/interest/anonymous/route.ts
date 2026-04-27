import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { interests, session_id } = body

        if (!Array.isArray(interests) || interests.length === 0) {
            return NextResponse.json({ error: 'interests must be a non-empty array' }, { status: 400 })
        }

        const supabase = await createClient()
        const rows = interests.map((tag: string) => ({
            tag: tag.trim().toLowerCase(),
            session_id: session_id ?? null,
        }))

        const { error } = await supabase.from('anonymous_interests').insert(rows)
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })

        return NextResponse.json({ success: true, count: rows.length })
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}