import type { Memory } from '../types/memory';
import { MemoryCard } from './MemoryCard';
import { EmptyState } from './ui/EmptyState';
import { MemoryGridSkeleton } from './ui/MemoryGridSkeleton';

interface Props {
  memories: Memory[];
  isLoading: boolean;
  isSemanticSearching: boolean;
  onCreate: () => void;
}

export const MemoryGrid = ({ memories, isLoading, isSemanticSearching, onCreate }: Props) => {
  if (isLoading) return <MemoryGridSkeleton />;

  if (memories.length === 0) {
    return (
      <EmptyState
        title="No memories matched the AI interpretation"
        description="Try a more descriptive search phrase or create a new memory for AI enrichment."
        ctaLabel="Add new memory"
        onCtaClick={onCreate}
      />
    );
  }

  return (
    <section className="space-y-4">
      {isSemanticSearching && (
        <p className="text-xs text-blue-200">AI is ranking memories by semantic similarity…</p>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </section>
  );
};
