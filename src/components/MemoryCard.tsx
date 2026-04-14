import { motion } from 'framer-motion';
import { Brain, CalendarDays, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Memory } from '../types/memory';
import { formatMemoryDate } from '../utils/date';

interface Props {
  memory: Memory;
}

export const MemoryCard = ({ memory }: Props) => (
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
    <Link to={`/memories/${memory.id}`} className="group block overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80">
      <div className="relative h-52 overflow-hidden">
        <img src={memory.image} alt={memory.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-xs text-blue-100 backdrop-blur">
          AI detected: {memory.emotion}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-100">{memory.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-300">{memory.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{formatMemoryDate(memory.date)}</span>
          <span className="inline-flex items-center gap-1"><HeartPulse className="h-3.5 w-3.5" />{memory.emotion}</span>
          <span className="inline-flex items-center gap-1"><Brain className="h-3.5 w-3.5" />AI enriched</span>
        </div>
      </div>
    </Link>
  </motion.div>
);
