import Link from "next/link";

export default function Home() {
  return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <main className="flex flex-col items-center text-center gap-8 max-w-md w-full">

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Find your people
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
              Add your interests, discover users who share them.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
                href="/register"
                className="flex h-11 flex-1 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-medium transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Create account
            </Link>
            <Link
                href="/login"
                className="flex h-11 flex-1 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-50 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Sign in
            </Link>
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            No credit card required. Free to use.
          </p>

        </main>
      </div>
  );
}