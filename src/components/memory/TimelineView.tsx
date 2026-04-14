import type { Memory } from '../../types/memory';
import { formatReadableDate, monthLabel } from '../../utils/date';

const groupByMonth = (memories: Memory[]): Record<string, Memory[]> => {
  return memories.reduce<Record<string, Memory[]>>((acc, memory) => {
    const key = monthLabel(memory.date);
    acc[key] = acc[key] ? [...acc[key], memory] : [memory];
    return acc;
  }, {});
};

export const TimelineView = ({ memories }: { memories: Memory[] }) => {
  const groups = groupByMonth(memories);

  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([key, items]) => (
        <section key={key}>
          <h3 className="mb-4 text-lg font-semibold text-blue-50">{key}</h3>
          <div className="space-y-3 border-l border-blue-400/30 pl-5">
            {items.map((memory) => (
              <article key={memory.id} className="relative rounded-xl border border-blue-500/20 bg-slate-900/70 p-4">
                <span className="absolute -left-[27px] top-5 h-3 w-3 rounded-full bg-blue-400" />
                <p className="text-xs text-blue-300">{formatReadableDate(memory.date)}</p>
                <p className="font-medium text-blue-50">{memory.title}</p>
                <p className="text-sm text-blue-200/80">{memory.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
