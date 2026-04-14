import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMemoryStore } from '../store/memoryStore';
import { formatDisplayDate } from '../utils/date';
import { MemoryGrid } from '../components/memory/MemoryGrid';

export const MemoryDetailPage = () => {
  const { id } = useParams();
  const { memories, loadRelatedMemories, relatedMemories } = useMemoryStore();

  const memory = useMemo(() => memories.find((item) => item.id === id), [memories, id]);

  useEffect(() => {
    if (id) void loadRelatedMemories(id);
  }, [id, loadRelatedMemories]);

  if (!memory) return <p className="rounded-xl bg-slate-900/70 p-4 text-white">Memory not found.</p>;

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        <img src={memory.image} alt={memory.title} className="h-72 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute bottom-0 p-5 text-white">
          <h2 className="text-3xl font-bold">{memory.title}</h2>
          <p>{formatDisplayDate(memory.date)} · {memory.location}</p>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-5 text-slate-100">
        <p className="text-sm text-ai-200">AI-detected emotion: {memory.emotion}</p>
        <p className="mt-2">{memory.description}</p>
        <p className="mt-2 text-xs text-slate-400">Caption model: {memory.ai.captionModel} · Embedding model: {memory.ai.embeddingModel}</p>
      </div>
      <div>
        <h3 className="mb-3 text-xl font-semibold text-white">Related Memories (semantic similarity)</h3>
        <MemoryGrid memories={relatedMemories} />
      </div>
    </section>
  );
};
