import { Brain, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Memory } from '../../types/memory';
import { formatReadableDate } from '../../utils/date';

export const MemoryCard = ({ memory }: { memory: Memory }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/memory/${memory.id}`)}
      className="group overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-950/70 text-left transition hover:-translate-y-1 hover:border-blue-400/60"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={memory.image} alt={memory.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-blue-50">{memory.title}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-blue-200">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2 py-1"><CalendarDays className="h-3 w-3" />{formatReadableDate(memory.date)}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-1"><Brain className="h-3 w-3" />{memory.emotion}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1"><MapPin className="h-3 w-3" />{memory.location}</span>
        </div>
        <p className="line-clamp-2 text-sm text-blue-100/80">{memory.description}</p>
        <p className="inline-flex items-center gap-1 text-xs text-blue-300"><Sparkles className="h-3.5 w-3.5" /> AI-generated description</p>
      </div>
    </button>
  );
};
