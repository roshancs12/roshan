import type { Emotion } from './memory';

export interface MemoryFilters {
  tags: string[];
  emotion: Emotion | 'all';
}
