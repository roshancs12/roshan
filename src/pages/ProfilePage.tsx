import { CalendarHeatmap } from '../components/profile/CalendarHeatmap';
import { useAuthStore } from '../store/authStore';
import { useMemoryStore } from '../store/memoryStore';

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const memories = useMemoryStore((state) => state.memories);

  const emotionCount = memories.reduce<Record<string, number>>((acc, memory) => {
    acc[memory.emotion] = (acc[memory.emotion] ?? 0) + 1;
    return acc;
  }, {});
  const topEmotion = Object.entries(emotionCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/45 p-5 text-white backdrop-blur">
      <div className="flex items-center gap-4">
        <img src={user?.avatarUrl ?? 'https://i.pravatar.cc/120'} className="h-16 w-16 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{user?.name ?? 'Memory Explorer'}</h2>
          <p className="text-slate-300">{user?.email ?? 'user@email.com'}</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-300">Total memories</p>
          <p className="text-3xl font-bold text-ai-100">{memories.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-300">Most frequent emotion (AI insight)</p>
          <p className="text-3xl font-bold text-ai-100">{topEmotion}</p>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Memory Activity Heatmap</h3>
        <CalendarHeatmap memories={memories} />
      </div>
    </section>
  );
};
