import type { Memory } from '../../types/memory';
import { formatReadableDate, monthLabel } from '../../utils/date';

const groupByMonth = (memories: Memory[]): Record<string, Memory[]> => {
  const sorted = [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return sorted.reduce<Record<string, Memory[]>>((acc, memory) => {
    const key = monthLabel(memory.date);
    acc[key] = acc[key] ? [...acc[key], memory] : [memory];
    return acc;
  }, {});
};

const getBusiestMonth = (groups: Record<string, Memory[]>) => {
  return Object.entries(groups).reduce<{ label: string; count: number } | null>((max, [label, items]) => {
    if (!max || items.length > max.count) return { label, count: items.length };
    return max;
  }, null);
};

export const TimelineView = ({ memories }: { memories: Memory[] }) => {
  const groups = groupByMonth(memories);
  const busiestMonth = getBusiestMonth(groups);

  if (!memories.length) {
    return <p className="text-blue-200/80">No memories yet. Add a memory to see your timeline patterns.</p>;
  }

  return (
    <div className="space-y-8">
      {busiestMonth ? (
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm text-blue-100">
          Activity highlight: <span className="font-semibold">{busiestMonth.label}</span> has your highest memory activity ({busiestMonth.count} memories).
        </div>
      ) : null}

      {Object.entries(groups).map(([key, items]) => (
        <section key={key}>
          <h3 className="mb-4 text-lg font-semibold text-blue-50">{key}</h3>
          <div className="space-y-3 border-l border-blue-400/30 pl-5">
            {items.map((memory) => (
              <article key={memory.id} className="relative rounded-xl border border-blue-500/20 bg-slate-900/70 p-4 transition hover:border-blue-400/40">
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
