import { Link } from 'react-router-dom';
import type { Memory } from '../types/memory';
import { formatMemoryDate } from '../utils/date';

interface MemoryCardProps {
  memory: Memory;
}

export const MemoryCard = ({ memory }: MemoryCardProps) => {
  return (
    <Link
      to={`/memory/${memory.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
    >
      <img src={memory.imageUrl} alt={memory.caption} className="h-48 w-full object-cover" />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-ai-50 px-2 py-1 text-xs font-semibold uppercase text-ai-700">
            {memory.emotion}
          </span>
          <span className="text-xs text-slate-500">{formatMemoryDate(memory.createdAt)}</span>
        </div>
        <p className="text-sm text-slate-800">{memory.caption}</p>
        <div className="flex flex-wrap gap-2">
          {memory.tags.map((tag) => (
            <span key={`${memory.id}-${tag}`} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
