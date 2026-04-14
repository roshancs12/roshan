export const LoadingSkeleton = () => (
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="animate-pulse rounded-2xl border border-white/10 bg-slate-800/70 p-4">
        <div className="h-40 rounded-xl bg-slate-700" />
        <div className="mt-3 h-4 w-3/4 rounded bg-slate-700" />
        <div className="mt-2 h-3 w-1/2 rounded bg-slate-700" />
        <div className="mt-4 h-3 w-full rounded bg-slate-700" />
      </div>
    ))}
  </div>
);
