import { useMemo } from 'react';
import { useAuthStore } from '../store/authStore';
import { useMemoryStore } from '../store/memoryStore';
import { getCalendarHeatmapData } from '../utils/date';

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const memories = useMemoryStore((state) => state.memories);

  const emotion = useMemo(() => {
    const map = memories.reduce<Record<string, number>>((acc, memory) => {
      acc[memory.emotion] = (acc[memory.emotion] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';
  }, [memories]);

  const heatmap = getCalendarHeatmapData(memories);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-blue-200">Profile</h1>
      <div className="glass-panel rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/30 text-xl text-white">{user?.name?.[0] ?? 'U'}</div>
          <div>
            <p className="text-lg text-white">{user?.name ?? 'User'}</p>
            <p className="text-sm text-slate-300">{user?.email ?? 'No email'}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-900/70 p-4 text-slate-200">Total memories: {memories.length}</div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-slate-200">Most frequent emotion: {emotion}</div>
          <div className="rounded-xl bg-slate-900/70 p-4 text-slate-200">Active days: {Object.keys(heatmap).length}</div>
        </div>
      </div>
    </div>
  );
};
