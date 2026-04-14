import { format, parseISO } from 'date-fns';
import type { Memory } from '../types/memory';

export const formatMemoryDate = (iso: string) => format(parseISO(iso), 'PPP');

export const groupMemoriesByDay = (memories: Memory[]) => {
  return memories.reduce<Record<string, Memory[]>>((acc, memory) => {
    const key = format(parseISO(memory.date), 'yyyy-MM-dd');
    acc[key] = [...(acc[key] ?? []), memory];
    return acc;
  }, {});
};

export const getCalendarHeatmapData = (memories: Memory[]) => {
  const counts: Record<string, number> = {};
  memories.forEach((memory) => {
    const key = format(parseISO(memory.date), 'yyyy-MM-dd');
    counts[key] = (counts[key] ?? 0) + 1;
  });
  return counts;
};
