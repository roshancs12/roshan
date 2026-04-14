import { TimelineView } from '../components/timeline/TimelineView';
import { useMemoryStore } from '../store/memoryStore';

export const TimelinePage = () => {
  const memories = useMemoryStore((state) => state.memories);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-5 backdrop-blur">
      <h2 className="mb-3 text-2xl font-bold text-white">Timeline</h2>
      <TimelineView memories={memories} />
    </div>
  );
};
