import { create } from 'zustand';
import { addMemory, fetchMemories, getRelatedMemories, semanticSearch } from '../services/memoryService';
import type { AIAnalysisResult, AddMemoryPayload, Memory } from '../types/memory';

interface MemoryState {
  memories: Memory[];
  visibleMemories: Memory[];
  relatedMemories: Memory[];
  currentQuery: string;
  loading: boolean;
  error: string | null;
  aiPreview: AIAnalysisResult | null;
  loadMemories: () => Promise<void>;
  runSemanticSearch: (query: string) => Promise<void>;
  createMemory: (payload: AddMemoryPayload) => Promise<void>;
  loadRelatedMemories: (memoryId: string) => Promise<void>;
  clearAiPreview: () => void;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  visibleMemories: [],
  relatedMemories: [],
  currentQuery: '',
  loading: false,
  error: null,
  aiPreview: null,
  loadMemories: async () => {
    set({ loading: true, error: null });
    try {
      const memories = await fetchMemories();
      set({ memories, visibleMemories: memories, loading: false });
    } catch {
      set({ error: 'Failed to load memories', loading: false });
    }
  },
  runSemanticSearch: async (query) => {
    set({ currentQuery: query, loading: true, error: null });
    try {
      const visibleMemories = query.trim() ? await semanticSearch(query) : get().memories;
      set({ visibleMemories, loading: false });
    } catch {
      set({ error: 'Semantic search failed', loading: false });
    }
  },
  createMemory: async (payload) => {
    set({ loading: true, error: null, aiPreview: null });
    try {
      const response = await addMemory(payload);
      set((state) => {
        const memories = [response.memory, ...state.memories];
        return { memories, visibleMemories: memories, aiPreview: response.aiAnalysis, loading: false };
      });
    } catch {
      set({ error: 'Memory upload failed', loading: false });
      throw new Error('memory_upload_failed');
    }
  },
  loadRelatedMemories: async (memoryId) => {
    set({ loading: true, error: null });
    try {
      const relatedMemories = await getRelatedMemories(memoryId);
      set({ relatedMemories, loading: false });
    } catch {
      set({ error: 'Could not retrieve related memories', loading: false });
    }
  },
  clearAiPreview: () => set({ aiPreview: null })
}));
