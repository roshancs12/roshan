export const formatReadableDate = (date: string): string =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));

export const dateKey = (date: string): string => new Date(date).toISOString().slice(0, 10);

export const monthLabel = (date: string): string =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
