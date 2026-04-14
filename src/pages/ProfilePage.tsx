import { useEffect, useState } from 'react';
import { BrainCog, Mail, User2 } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Heatmap } from '../components/profile/Heatmap';
import { fetchProfile } from '../services/memoryService';
import { useMemoryStore } from '../store/memoryStore';
import type { AuthUser } from '../types/auth';
import type { UserInsight } from '../types/memory';
import { buildHeatmapData } from '../utils/heatmap';

export const ProfilePage = () => {
  const memories = useMemoryStore((state) => state.memories);
  const loadMemories = useMemoryStore((state) => state.loadMemories);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [insight, setInsight] = useState<UserInsight | null>(null);

  useEffect(() => {
    if (!memories.length) void loadMemories();
  }, [loadMemories, memories.length]);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await fetchProfile();
        setUser(profile.user);
        setInsight(profile.insight);
      } catch {
        setInsight(null);
      }
    };
    void load();
  }, []);

  const heatmap = buildHeatmapData(memories.map((memory) => memory.date));

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Sidebar />
        <main className="flex-1 space-y-6 rounded-2xl border border-blue-500/20 bg-slate-900/60 p-6">
          <h1 className="text-3xl font-bold text-blue-200">Profile</h1>
          <section className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-5">
            <div className="flex items-center gap-4">
              {user?.avatar ? <img src={user.avatar} className="h-16 w-16 rounded-full object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/30"><User2 /></div>}
              <div>
                <p className="text-xl font-semibold">{user?.name ?? 'Memory Explorer'}</p>
                <p className="text-blue-200/80"><Mail className="mr-1 inline h-4 w-4" />{user?.email ?? 'unknown@email.com'}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-5">
              <p className="text-sm text-blue-200/70">Total memories</p>
              <p className="text-4xl font-bold text-blue-100">{memories.length}</p>
            </article>
            <article className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-5">
              <p className="text-sm text-blue-200/70">Most frequent emotion (AI)</p>
              <p className="text-2xl font-semibold text-blue-100">{insight?.mostFrequentEmotion ?? '—'}</p>
              <p className="mt-2 text-xs text-blue-300"><BrainCog className="mr-1 inline h-3.5 w-3.5" />Active periods: {insight?.activePeriods.join(', ') ?? 'Not available'}</p>
            </article>
          </section>

          <section className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-5">
            <p className="mb-3 font-semibold text-blue-100">Memory activity heatmap</p>
            <Heatmap values={heatmap} />
          </section>
        </main>
      </div>
    </div>
  );
};
