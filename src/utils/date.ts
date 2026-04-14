export const formatDisplayDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const dayKey = (isoDate: string): string => new Date(isoDate).toISOString().split('T')[0];
