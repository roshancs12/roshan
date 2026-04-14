import { create } from 'zustand';
import { memoryService } from '../services/memoryService';
import type { AddMemoryInput, Memory, MemoryAnalysis } from '../types/memory';

interface MemoryState {
  memories: Memory[];
  searchResults: Memory[];
  relatedMemories: Record<string, Memory[]>;
  currentQuery: string;
  isLoading: boolean;
  isSemanticSearching: boolean;
  isAiProcessing: boolean;
  uploadModalOpen: boolean;
  aiPreview: MemoryAnalysis | null;
  error: string | null;
  loadMemories: () => Promise<void>;
  semanticSearch: (query: string) => Promise<void>;
  clearSemanticSearch: () => void;
  fetchRelatedMemories: (memoryId: string) => Promise<void>;
  analyzeBeforeSave: (payload: AddMemoryInput) => Promise<void>;
  createMemory: (payload: AddMemoryInput) => Promise<void>;
  setUploadModalOpen: (open: boolean) => void;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  searchResults: [],
  relatedMemories: {},
  currentQuery: '',
  isLoading: false,
  isSemanticSearching: false,
  isAiProcessing: false,
  uploadModalOpen: false,
  aiPreview: null,
  error: null,

  async loadMemories() {
    set({ isLoading: true, error: null });
    try {
      const memories = await memoryService.fetchMemories();
      set({ memories, searchResults: memories, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Failed to load memories.' });
    }
  },

  async semanticSearch(query) {
    const trimmed = query.trim();
    set({ currentQuery: query, isSemanticSearching: true, error: null });

    if (!trimmed) {
      set({ searchResults: get().memories, isSemanticSearching: false });
      return;
    }

    try {
      const response = await memoryService.semanticSearch(trimmed);
      set({ searchResults: response.results, isSemanticSearching: false });
    } catch {
      set({ isSemanticSearching: false, error: 'Semantic search failed. Please retry.' });
    }
  },

  clearSemanticSearch() {
    set({ currentQuery: '', searchResults: get().memories });
  },

  async fetchRelatedMemories(memoryId) {
    try {
      const response = await memoryService.getRelatedMemories(memoryId);
      set((state) => ({
        relatedMemories: { ...state.relatedMemories, [memoryId]: response.related }
      }));
    } catch {
      set({ error: 'Failed to fetch related memories.' });
    }
  },

  async analyzeBeforeSave(payload) {
    set({ isAiProcessing: true, error: null, aiPreview: null });
    try {
      const response = await memoryService.analyzeMemory(payload);
      set({ aiPreview: response.analysis, isAiProcessing: false });
    } catch {
      set({ isAiProcessing: false, error: 'AI analysis failed. Try another image.' });
      throw new Error('analysis failed');
    }
  },

  async createMemory(payload) {
    set({ isAiProcessing: true, error: null });
    try {
      const memory = await memoryService.addMemory(payload);
      const nextMemories = [memory, ...get().memories];
      set({
        memories: nextMemories,
        searchResults: nextMemories,
        isAiProcessing: false,
        uploadModalOpen: false,
        aiPreview: null
      });
    } catch {
      set({ isAiProcessing: false, error: 'Unable to save memory.' });
      throw new Error('save failed');
    }
  },

  setUploadModalOpen(open) {
    set({ uploadModalOpen: open, ...(open ? {} : { aiPreview: null }) });
  }
}));
