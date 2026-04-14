import { create } from 'zustand';
import {
  addMemory,
  analyzeMemory,
  fetchMemories,
  getMemoryById,
  getRelatedMemories,
  semanticSearch
} from '../services/memoryService';
import type { AnalyzedMemoryPreview, Memory, MemoryDraft } from '../types/memory';

interface MemoryState {
  memories: Memory[];
  visibleMemories: Memory[];
  relatedMemories: Memory[];
  query: string;
  loading: boolean;
  searchLoading: boolean;
  uploadOpen: boolean;
  aiProcessing: boolean;
  savingMemory: boolean;
  uploadPreview: AnalyzedMemoryPreview | null;
  pendingDraft: MemoryDraft | null;
  selectedMemory: Memory | null;
  error: string | null;
  loadMemories: () => Promise<void>;
  semanticSearchMemories: (query: string) => Promise<void>;
  clearSearch: () => void;
  setUploadOpen: (open: boolean) => void;
  analyzeDraftWithAI: (draft: MemoryDraft) => Promise<void>;
  saveAnalyzedMemory: () => Promise<void>;
  getMemoryDetail: (id: string) => Promise<void>;
  loadRelated: (id: string) => Promise<void>;
  resetPreview: () => void;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  visibleMemories: [],
  relatedMemories: [],
  query: '',
  loading: false,
  searchLoading: false,
  uploadOpen: false,
  aiProcessing: false,
  savingMemory: false,
  uploadPreview: null,
  pendingDraft: null,
  selectedMemory: null,
  error: null,

  async loadMemories() {
    set({ loading: true, error: null });
    try {
      const memories = await fetchMemories();
      set({ memories, visibleMemories: memories, loading: false });
    } catch {
      set({ loading: false, error: 'Unable to load memories from AI memory service.' });
    }
  },

  async semanticSearchMemories(query) {
    set({ query, searchLoading: true, error: null });
    try {
      if (!query.trim()) {
        set({ visibleMemories: get().memories, searchLoading: false });
        return;
      }
      const results = await semanticSearch(query);
      set({ visibleMemories: results, searchLoading: false });
    } catch {
      set({ searchLoading: false, error: 'Semantic retrieval failed. Please retry.' });
    }
  },

  clearSearch() {
    set((state) => ({ query: '', visibleMemories: state.memories }));
  },

  setUploadOpen(open) {
    set({ uploadOpen: open });
  },

  async analyzeDraftWithAI(draft) {
    set({ aiProcessing: true, uploadPreview: null, pendingDraft: draft, error: null });
    try {
      const analyzed = await analyzeMemory(draft);
      set({ uploadPreview: analyzed, aiProcessing: false });
    } catch {
      set({ aiProcessing: false, error: 'AI analysis failed. Check server availability.' });
      throw new Error('analyze-failed');
    }
  },

  async saveAnalyzedMemory() {
    const { pendingDraft, uploadPreview } = get();
    if (!pendingDraft || !uploadPreview?.uploadId) {
      throw new Error('missing-analysis');
    }

    set({ savingMemory: true, error: null });
    try {
      const memory = await addMemory({ ...pendingDraft, uploadId: uploadPreview.uploadId });
      const next = [memory, ...get().memories];
      set({
        memories: next,
        visibleMemories: get().query ? get().visibleMemories : next,
        savingMemory: false,
        uploadOpen: false,
        pendingDraft: null,
        uploadPreview: null
      });
    } catch {
      set({ savingMemory: false, error: 'Saving analyzed memory failed. Please retry.' });
      throw new Error('save-failed');
    }
  },

  async getMemoryDetail(id) {
    set({ loading: true, error: null });
    try {
      const memory = await getMemoryById(id);
      set({ selectedMemory: memory, loading: false });
    } catch {
      set({ loading: false, error: 'Unable to load memory detail.' });
    }
  },

  async loadRelated(id) {
    set({ relatedMemories: [], error: null });
    try {
      const related = await getRelatedMemories(id);
      set({ relatedMemories: related });
    } catch {
      set({ error: 'Could not fetch AI-related memories.' });
    }
  },

  resetPreview() {
    set({ uploadPreview: null, pendingDraft: null, aiProcessing: false, savingMemory: false });
  }
}));
