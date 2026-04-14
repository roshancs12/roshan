import { initialMemories } from './mockMemories';
import type { AIGeneratedMetadata, Memory, MemoryInput } from '../types/memory';

const emotionHeuristics: Record<string, AIGeneratedMetadata['emotion']> = {
  beach: 'happy',
  family: 'nostalgic',
  mountain: 'reflective',
  city: 'excited',
  forest: 'calm',
  sunset: 'happy'
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const uniqueWords = (value: string): string[] => {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((token) => token.length > 2)
    )
  );
};

const computeScore = (memory: Memory, queryTokens: string[]) => {
  if (queryTokens.length === 0) return 1;

  const content = `${memory.caption} ${memory.aiDescription} ${memory.tags.join(' ')}`.toLowerCase();
  return queryTokens.reduce((score, token) => {
    if (content.includes(token)) {
      return score + 2;
    }
    if (memory.tags.some((tag) => tag.includes(token))) {
      return score + 1;
    }
    return score;
  }, 0);
};

export const aiMemoryService = {
  async fetchMemories(): Promise<Memory[]> {
    await delay(500);
    return structuredClone(initialMemories).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async semanticSearch(memories: Memory[], query: string): Promise<Memory[]> {
    await delay(180);
    const queryTokens = uniqueWords(query);
    return memories
      .map((memory) => ({ memory, score: computeScore(memory, queryTokens) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.memory);
  },

  async generateMetadata(input: MemoryInput): Promise<AIGeneratedMetadata> {
    await delay(350);
    const tokens = uniqueWords(input.caption);
    const tags = tokens.slice(0, 4).length > 0 ? tokens.slice(0, 4) : ['moment', 'memory'];
    const prioritizedEmotion = tags.find((tag) => emotionHeuristics[tag]);
    const emotion = prioritizedEmotion ? emotionHeuristics[prioritizedEmotion] : 'reflective';

    return {
      tags,
      emotion,
      aiDescription: `AI insight: ${input.caption.trim() || 'Captured memory'} with context around ${tags.join(', ')}.`
    };
  },

  async addMemory(input: MemoryInput): Promise<Memory> {
    const metadata = await this.generateMetadata(input);
    await delay(200);

    return {
      id: `m-${Date.now()}`,
      imageUrl: input.imageUrl,
      caption: input.caption,
      aiDescription: metadata.aiDescription,
      tags: metadata.tags,
      emotion: metadata.emotion,
      createdAt: new Date().toISOString()
    };
  }
};
