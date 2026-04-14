import { TimelineView } from '../components/TimelineView';
import { useMemoryStore } from '../store/memoryStore';

export const TimelinePage = () => {
  const memories = useMemoryStore((state) => state.searchResults);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-blue-200">Timeline</h1>
      <p className="text-sm text-slate-300">Chronological view of AI-enriched memories to reveal activity periods.</p>
      <TimelineView memories={memories} />
    </div>
  );
};
