import { dateKey } from './date';

export const buildHeatmapData = (dates: string[]): Record<string, number> => {
  return dates.reduce<Record<string, number>>((acc, date) => {
    const key = dateKey(date);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
};
