import type { Memory } from '../types/memory';
import { timelineDateKey } from '../utils/date';

interface TimelineViewProps {
  memories: Memory[];
}

export const TimelineView = ({ memories }: TimelineViewProps) => {
  const grouped = memories.reduce<Record<string, Memory[]>>((acc, memory) => {
    const key = timelineDateKey(memory.createdAt);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(memory);
    return acc;
  }, {});

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
      <h2 className="text-base font-semibold text-slate-800">Timeline Intelligence</h2>
      {Object.entries(grouped).map(([date, dailyMemories]) => (
        <div key={date} className="rounded-xl bg-slate-50 p-3">
          <p className="text-sm font-medium text-slate-700">{date}</p>
          <div className="mt-2 space-y-2">
            {dailyMemories.map((memory) => (
              <div key={memory.id} className="flex items-center gap-3 rounded-lg bg-white p-2">
                <img src={memory.imageUrl} alt={memory.caption} className="h-12 w-12 rounded-md object-cover" />
                <div>
                  <p className="text-sm text-slate-800">{memory.caption}</p>
                  <p className="text-xs text-slate-500">{memory.aiDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
