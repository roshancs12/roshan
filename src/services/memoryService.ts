import { apiClient } from './apiClient';
import type { AddMemoryPayload, Memory } from '../types/memory';
import type { AddMemoryResponse, ApiListResponse } from '../types/api';

export const fetchMemories = async (): Promise<Memory[]> => {
  const { data } = await apiClient.get<ApiListResponse<Memory>>('/memories');
  return data.data;
};

export const addMemory = async (payload: AddMemoryPayload): Promise<AddMemoryResponse> => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('date', payload.date);
  formData.append('location', payload.location);
  formData.append('image', payload.image);

  const { data } = await apiClient.post<AddMemoryResponse>('/memories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data;
};

export const semanticSearch = async (query: string): Promise<Memory[]> => {
  const { data } = await apiClient.get<ApiListResponse<Memory>>('/memories/semantic-search', {
    params: { query }
  });
  return data.data;
};

export const getRelatedMemories = async (memoryId: string): Promise<Memory[]> => {
  const { data } = await apiClient.get<ApiListResponse<Memory>>(`/memories/${memoryId}/related`);
  return data.data;
};
