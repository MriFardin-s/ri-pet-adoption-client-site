export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950">

      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
        <p className="text-slate-500 dark:text-zinc-400 font-medium">
          Loading...
        </p>

      </div>
    </div>
  );
}