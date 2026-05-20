import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4">

      <div className="text-center max-w-md">

        <div className="flex justify-center mb-6">

          <div className="w-24 h-24 rounded-full bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center">

            <FaExclamationTriangle className="text-4xl text-pink-500" />

          </div>
        </div>
        <h1 className="text-6xl font-black text-slate-800 dark:text-white mb-3">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-zinc-200 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-zinc-400 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-md hover:opacity-95 transition"
        >
          Back To Home
        </Link>

      </div>
    </div>
  );
}