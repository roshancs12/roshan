import { motion } from 'framer-motion';
import type { Memory } from '../types/memory';
import { formatMemoryDate, groupMemoriesByDay } from '../utils/date';

interface Props {
  memories: Memory[];
}

export const TimelineView = ({ memories }: Props) => {
  const grouped = Object.entries(groupMemoriesByDay(memories)).sort(([a], [b]) => (a > b ? -1 : 1));

  return (
    <div className="space-y-8">
      {grouped.map(([dateKey, list]) => (
        <div key={dateKey} className="relative border-l border-blue-500/40 pl-8">
          <h3 className="mb-4 text-sm font-medium text-blue-200">{formatMemoryDate(list[0].date)}</h3>
          <div className="space-y-4">
            {list.map((memory, idx) => (
              <motion.div key={memory.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="glass-panel rounded-xl p-4">
                <p className="text-sm font-semibold text-white">{memory.title}</p>
                <p className="mt-1 text-sm text-slate-300">{memory.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
