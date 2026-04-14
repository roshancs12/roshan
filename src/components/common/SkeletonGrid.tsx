export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/60">
          <div className="h-48 animate-pulse bg-slate-800" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-2/3 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};
