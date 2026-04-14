import { Link, useParams } from 'react-router-dom';
import { useMemoryStore } from '../store/memoryStore';
import { formatMemoryDate } from '../utils/date';

export const MemoryDetailPage = () => {
  const { id } = useParams();
  const memory = useMemoryStore((state) => state.memories.find((item) => item.id === id));

  if (!memory) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-sm text-slate-700">Memory not found.</p>
        <Link to="/" className="mt-3 inline-block text-sm text-ai-700">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl bg-white p-5 shadow-soft">
      <Link to="/" className="text-sm text-ai-700">← Back</Link>
      <img src={memory.imageUrl} alt={memory.caption} className="h-80 w-full rounded-xl object-cover" />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-900">{memory.caption}</h1>
        <p className="text-sm text-slate-600">{memory.aiDescription}</p>
        <p className="text-sm text-slate-500">Emotion: <span className="font-medium capitalize">{memory.emotion}</span></p>
        <p className="text-sm text-slate-500">Date: {formatMemoryDate(memory.createdAt)}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {memory.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
