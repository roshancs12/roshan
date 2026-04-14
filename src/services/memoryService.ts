import { apiClient } from './apiClient';
import type { RelatedMemoriesResponse, SemanticSearchResponse } from '../types/api';
import type { AddMemoryInput, Memory, MemoryAnalysis } from '../types/memory';

const toFormData = (payload: AddMemoryInput) => {
  const form = new FormData();
  form.append('title', payload.title);
  form.append('date', payload.date);
  form.append('location', payload.location);
  form.append('image', payload.image);
  return form;
};

export const memoryService = {
  async fetchMemories() {
    const { data } = await apiClient.get<Memory[]>('/memories');
    return data;
  },
  async addMemory(payload: AddMemoryInput) {
    const { data } = await apiClient.post<Memory>('/memories', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  async analyzeMemory(payload: AddMemoryInput) {
    const { data } = await apiClient.post<{ analysis: MemoryAnalysis; draftId: string }>(
      '/memories/analyze',
      toFormData(payload),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  },
  async semanticSearch(query: string) {
    const { data } = await apiClient.get<SemanticSearchResponse>('/memories/search/semantic', {
      params: { query }
    });
    return data;
  },
  async getRelatedMemories(memoryId: string) {
    const { data } = await apiClient.get<RelatedMemoriesResponse>(`/memories/${memoryId}/related`);
    return data;
  }
};
