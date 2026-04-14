import { useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TimelineView } from '../components/memory/TimelineView';
import { useMemoryStore } from '../store/memoryStore';

export const TimelinePage = () => {
  const { memories, loadMemories } = useMemoryStore();

  useEffect(() => {
    if (!memories.length) void loadMemories();
  }, [memories.length, loadMemories]);

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Sidebar />
        <main className="flex-1 rounded-2xl border border-blue-500/20 bg-slate-900/60 p-6">
          <h1 className="mb-2 text-3xl font-bold text-blue-200">Timeline</h1>
          <p className="mb-6 text-sm text-blue-200/70">Chronological memory stream with emotional context.</p>
          <TimelineView memories={memories} />
        </main>
      </div>
    </div>
  );
};
