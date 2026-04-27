type SimilarUser = {
    user_id: string
    username: string
    common_interests: string[]
    overlap_count: number
}

export default function SimilarUsers({ users }: { users: SimilarUser[] }) {
    if (users.length === 0) {
        return (
            <p className="text-sm text-zinc-400 dark:text-zinc-600">
                No matches yet — add more interests to find people.
            </p>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {users.map(user => (
                <div
                    key={user.user_id}
                    className="rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 px-5 py-4 flex flex-col gap-3"
                >
                    <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {user.username}
            </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-800 rounded-full px-2.5 py-1">
              {user.overlap_count} shared
            </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {user.common_interests.map(tag => (
                            <span
                                key={tag}
                                className="rounded-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-2.5 py-1 text-xs font-medium"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}