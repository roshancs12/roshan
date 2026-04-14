import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMemoryStore } from '../store/memoryStore';
import { formatMemoryDate } from '../utils/date';
import { MemoryCard } from '../components/MemoryCard';

export const MemoryDetailPage = () => {
  const { id } = useParams();
  const { memories, relatedMemories, fetchRelatedMemories } = useMemoryStore();
  const memory = memories.find((item) => item.id === id);

  useEffect(() => {
    if (id) void fetchRelatedMemories(id);
  }, [id, fetchRelatedMemories]);

  if (!memory) return <p className="text-slate-100">Memory not found.</p>;

  const related = relatedMemories[memory.id] ?? [];

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="text-blue-200">← Back</Link>
      <section className="relative overflow-hidden rounded-2xl">
        <img src={memory.image} className="h-80 w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{memory.title}</h1>
          <p className="mt-2 max-w-2xl text-slate-200">{memory.description}</p>
          <p className="mt-4 text-sm">Emotion (AI-detected): <span className="text-blue-200">{memory.emotion}</span></p>
          <p className="text-sm">Date: {formatMemoryDate(memory.date)} • Location: {memory.location}</p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-blue-200">Related Memories (Similarity-based AI Retrieval)</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {related.map((item) => <MemoryCard key={item.id} memory={item} />)}
        </div>
      </section>
    </div>
  );
};
