import type { Memory } from '../../types/memory';
import { MemoryCard } from './MemoryCard';

interface MemoryGridProps {
  memories: Memory[];
}

export const MemoryGrid = ({ memories }: MemoryGridProps) => (
  <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {memories.map((memory) => (
      <MemoryCard key={memory.id} memory={memory} />
    ))}
  </section>
);
