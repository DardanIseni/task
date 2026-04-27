import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import InterestsManager from '@/components/InterestsManager'
import SimilarUsers from '@/components/SimilarUsers'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: interests } = await supabase
        .from('interests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    const { data: similarUsers } = await supabase.rpc('get_similar_users', {
        current_user_id: user.id
    })

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <header className="border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {user.email}
          </span>
                    <LogoutButton />
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-10 flex flex-col gap-12">

                <section>
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                        My interests
                    </h1>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-6">
                        Add topics you care about — the more you add, the better your matches.
                    </p>
                    <InterestsManager userId={user.id} initialInterests={interests ?? []} />
                </section>

                <div className="border-t border-zinc-100 dark:border-zinc-900" />

                <section>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                        People like you
                    </h2>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-6">
                        Users who share at least one interest with you, ranked by overlap.
                    </p>
                    <SimilarUsers users={similarUsers ?? []} />
                </section>

            </main>
        </div>
    )
}