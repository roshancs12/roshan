import type { AIAnalysisResult, Memory } from './memory';

export interface ApiListResponse<T> {
  data: T[];
}

export interface AddMemoryResponse {
  memory: Memory;
  aiAnalysis: AIAnalysisResult;
}
