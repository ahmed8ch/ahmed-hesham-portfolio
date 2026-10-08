import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bento-card rounded-2xl p-8 max-w-md">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">404 // Page Not Found</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          The requested system node or artifact does not exist.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-700"
        >
          Return to Overview
        </Link>
      </div>
    </div>
  );
}
