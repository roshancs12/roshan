import type { Memory } from '../types/memory';
import { MemoryCard } from './MemoryCard';

interface MemoryGridProps {
  memories: Memory[];
  loading: boolean;
  aiProcessing: boolean;
}

export const MemoryGrid = ({ memories, loading, aiProcessing }: MemoryGridProps) => {
  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-sm text-slate-600">Loading memory intelligence...</div>;
  }

  if (!loading && memories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-sm text-slate-700">No memories matched your semantic filters.</p>
        <p className="mt-1 text-xs text-slate-500">Try broadening emotion or tag constraints.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {aiProcessing && <div className="text-xs text-ai-700">AI is refining memory relevance...</div>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </div>
  );
};
