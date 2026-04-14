import type { AuthResponse } from './auth';
import type { AnalyzedMemoryPreview, Memory, MemoryDraft, UserInsight } from './memory';

export interface ApiError {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AnalyzeMemoryResponse extends AnalyzedMemoryPreview {
  uploadId: string;
}

export interface AddMemoryResponse {
  memory: Memory;
}

export interface ProfileResponse {
  user: AuthResponse['user'];
  totalMemories: number;
  insight: UserInsight;
}

export interface SemanticSearchResponse {
  results: Memory[];
}

export type AddMemoryPayload = Omit<MemoryDraft, 'image'> & { image: File; uploadId?: string };
