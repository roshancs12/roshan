import { apiClient } from './apiClient';
import type {
  AddMemoryPayload,
  AddMemoryResponse,
  AnalyzeMemoryResponse,
  ProfileResponse,
  SemanticSearchResponse
} from '../types/api';
import type { Memory } from '../types/memory';

const toFormData = (payload: AddMemoryPayload) => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('date', payload.date);
  formData.append('location', payload.location);
  formData.append('image', payload.image);
  if (payload.uploadId) {
    formData.append('uploadId', payload.uploadId);
  }
  return formData;
};

export const fetchMemories = async (): Promise<Memory[]> => {
  const { data } = await apiClient.get<{ memories: Memory[] }>('/memories');
  return data.memories;
};

export const analyzeMemory = async (payload: AddMemoryPayload): Promise<AnalyzeMemoryResponse> => {
  const formData = toFormData(payload);
  const { data } = await apiClient.post<AnalyzeMemoryResponse>('/memories/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const addMemory = async (payload: AddMemoryPayload): Promise<Memory> => {
  const formData = toFormData(payload);
  const { data } = await apiClient.post<AddMemoryResponse>('/memories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data.memory;
};

export const semanticSearch = async (query: string): Promise<Memory[]> => {
  const { data } = await apiClient.get<SemanticSearchResponse>('/memories/semantic-search', {
    params: { query }
  });
  return data.results;
};

export const getRelatedMemories = async (memoryId: string): Promise<Memory[]> => {
  const { data } = await apiClient.get<{ related: Memory[] }>(`/memories/${memoryId}/related`);
  return data.related;
};

export const getMemoryById = async (id: string): Promise<Memory> => {
  const { data } = await apiClient.get<{ memory: Memory }>(`/memories/${id}`);
  return data.memory;
};

export const fetchProfile = async (): Promise<ProfileResponse> => {
  const { data } = await apiClient.get<ProfileResponse>('/profile');
  return data;
};
