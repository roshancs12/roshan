import { create } from 'zustand';
import { aiMemoryService } from '../services/aiMemoryService';
import type { MemoryFilters } from '../types/filters';
import type { Emotion, Memory, MemoryInput } from '../types/memory';

interface MemoryState {
  memories: Memory[];
  filteredMemories: Memory[];
  searchQuery: string;
  filters: MemoryFilters;
  selectedMemory?: Memory;
  loading: boolean;
  aiProcessing: boolean;
  error?: string;
  loadMemories: () => Promise<void>;
  setSearchQuery: (query: string) => Promise<void>;
  toggleTagFilter: (tag: string) => Promise<void>;
  setEmotionFilter: (emotion: Emotion | 'all') => Promise<void>;
  clearFilters: () => Promise<void>;
  addMemory: (input: MemoryInput) => Promise<void>;
  selectMemory: (id: string) => void;
}

const applyFilters = async (
  memories: Memory[],
  searchQuery: string,
  filters: MemoryFilters
): Promise<Memory[]> => {
  const semanticResult = await aiMemoryService.semanticSearch(memories, searchQuery);

  return semanticResult.filter((memory) => {
    const matchesEmotion = filters.emotion === 'all' || memory.emotion === filters.emotion;
    const matchesTags =
      filters.tags.length === 0 || filters.tags.every((tag) => memory.tags.includes(tag));

    return matchesEmotion && matchesTags;
  });
};

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  filteredMemories: [],
  searchQuery: '',
  filters: { tags: [], emotion: 'all' },
  selectedMemory: undefined,
  loading: false,
  aiProcessing: false,
  error: undefined,

  async loadMemories() {
    set({ loading: true, error: undefined });
    try {
      const memories = await aiMemoryService.fetchMemories();
      const filteredMemories = await applyFilters(memories, get().searchQuery, get().filters);
      set({ memories, filteredMemories, loading: false });
    } catch {
      set({ loading: false, error: 'Failed to fetch memories.' });
    }
  },

  async setSearchQuery(query) {
    set({ searchQuery: query, aiProcessing: true });
    const filteredMemories = await applyFilters(get().memories, query, get().filters);
    set({ filteredMemories, aiProcessing: false });
  },

  async toggleTagFilter(tag) {
    const tags = get().filters.tags.includes(tag)
      ? get().filters.tags.filter((item) => item !== tag)
      : [...get().filters.tags, tag];

    const filters: MemoryFilters = { ...get().filters, tags };
    set({ filters, aiProcessing: true });
    const filteredMemories = await applyFilters(get().memories, get().searchQuery, filters);
    set({ filteredMemories, aiProcessing: false });
  },

  async setEmotionFilter(emotion) {
    const filters: MemoryFilters = { ...get().filters, emotion };
    set({ filters, aiProcessing: true });
    const filteredMemories = await applyFilters(get().memories, get().searchQuery, filters);
    set({ filteredMemories, aiProcessing: false });
  },

  async clearFilters() {
    const filters: MemoryFilters = { tags: [], emotion: 'all' };
    set({ filters, searchQuery: '', aiProcessing: true });
    const filteredMemories = await applyFilters(get().memories, '', filters);
    set({ filteredMemories, aiProcessing: false });
  },

  async addMemory(input) {
    set({ aiProcessing: true, error: undefined });
    try {
      const memory = await aiMemoryService.addMemory(input);
      const memories = [memory, ...get().memories];
      const filteredMemories = await applyFilters(memories, get().searchQuery, get().filters);
      set({ memories, filteredMemories, aiProcessing: false });
    } catch {
      set({ aiProcessing: false, error: 'Failed to process memory upload.' });
    }
  },

  selectMemory(id) {
    set({ selectedMemory: get().memories.find((memory) => memory.id === id) });
  }
}));
