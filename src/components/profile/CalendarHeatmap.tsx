import type { Memory } from '../../types/memory';
import { dayKey } from '../../utils/date';

interface CalendarHeatmapProps {
  memories: Memory[];
}

export const CalendarHeatmap = ({ memories }: CalendarHeatmapProps) => {
  const density = memories.reduce<Record<string, number>>((acc, memory) => {
    const key = dayKey(memory.date);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const days = Array.from({ length: 28 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return dayKey(date.toISOString());
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const value = density[day] ?? 0;
        return <div key={day} className={`h-8 rounded ${value === 0 ? 'bg-slate-800' : value < 3 ? 'bg-ai-900' : 'bg-ai-500'}`} title={`${day}: ${value}`} />;
      })}
    </div>
  );
};
