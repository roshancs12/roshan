export type Emotion = 'happy' | 'nostalgic' | 'calm' | 'excited' | 'reflective';

export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  aiDescription: string;
  tags: string[];
  emotion: Emotion;
  createdAt: string;
}

export interface MemoryInput {
  imageUrl: string;
  caption: string;
}

export interface AIGeneratedMetadata {
  tags: string[];
  emotion: Emotion;
  aiDescription: string;
}
