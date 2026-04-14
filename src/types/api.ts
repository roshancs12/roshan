import type { Memory, MemoryAnalysis } from './memory';

export interface SemanticSearchResponse {
  query: string;
  results: Memory[];
}

export interface RelatedMemoriesResponse {
  memoryId: string;
  related: Memory[];
}

export interface AnalyzeMemoryResponse {
  analysis: MemoryAnalysis;
  draftId: string;
}
