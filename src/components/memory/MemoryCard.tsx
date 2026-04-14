import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Memory } from '../../types/memory';
import { formatDisplayDate } from '../../utils/date';

interface MemoryCardProps {
  memory: Memory;
}

export const MemoryCard = ({ memory }: MemoryCardProps) => (
  <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-soft backdrop-blur">
    <Link to={`/memory/${memory.id}`}>
      <img src={memory.image} alt={memory.title} className="h-44 w-full rounded-xl object-cover" />
      <div className="mt-3 space-y-2">
        <h3 className="text-lg font-semibold text-white">{memory.title}</h3>
        <p className="text-xs text-slate-300">{formatDisplayDate(memory.date)}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-ai-500/20 px-2 py-1 text-ai-100">AI Emotion: {memory.emotion}</span>
          <span className="text-slate-400">{memory.ai.confidence ? `${Math.round(memory.ai.confidence * 100)}%` : 'AI inferred'}</span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-300">{memory.description}</p>
        <p className="flex items-center gap-1 text-xs text-ai-200"><Sparkles className="h-3.5 w-3.5" /> AI-generated caption & enriched context</p>
      </div>
    </Link>
  </motion.div>
);
