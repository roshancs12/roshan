import type { Memory } from '../../types/memory';
import { Loader } from '../common/Loader';
import { MemoryCard } from './MemoryCard';

interface MemoryGridProps {
  memories: Memory[];
  loading: boolean;
  hasQuery: boolean;
  onCreate: () => void;
}

export const MemoryGrid = ({ memories, loading, hasQuery, onCreate }: MemoryGridProps) => {
  if (loading) {
    return <Loader text="Retrieving memories from vector index..." />;
  }

  if (!memories.length) {
    return (
      <div className="rounded-2xl border border-blue-400/20 bg-slate-900/70 p-12 text-center">
        <p className="text-2xl font-semibold text-blue-50">{hasQuery ? 'No semantic match found' : 'No memories yet'}</p>
        <p className="mt-2 text-blue-200/80">
          {hasQuery
            ? 'AI could not find semantically similar memories for this query. Try describing mood, people, or context.'
            : 'Upload your first moment and let AI generate emotional context and descriptions.'}
        </p>
        <button
          onClick={onCreate}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-500"
        >
          New Memory
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
};
