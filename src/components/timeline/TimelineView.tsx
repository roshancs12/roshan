import type { Memory } from '../../types/memory';
import { formatDisplayDate } from '../../utils/date';

interface TimelineViewProps {
  memories: Memory[];
}

export const TimelineView = ({ memories }: TimelineViewProps) => {
  const grouped = memories.reduce<Record<string, Memory[]>>((acc, memory) => {
    const key = memory.date.slice(0, 10);
    acc[key] = acc[key] ? [...acc[key], memory] : [memory];
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="space-y-8">
      {sortedDates.map((date) => (
        <section key={date}>
          <h3 className="mb-3 text-lg font-semibold text-ai-100">{formatDisplayDate(date)}</h3>
          <div className="border-l border-ai-500/40 pl-4">
            {grouped[date].map((memory) => (
              <article key={memory.id} className="mb-4 rounded-xl border border-white/10 bg-slate-900/70 p-4">
                <p className="font-medium text-white">{memory.title}</p>
                <p className="text-sm text-slate-300">{memory.description}</p>
                <p className="mt-1 text-xs text-ai-200">AI emotion: {memory.emotion}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
