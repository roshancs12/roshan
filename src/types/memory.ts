export type Emotion =
  | 'joyful'
  | 'nostalgic'
  | 'peaceful'
  | 'excited'
  | 'reflective'
  | 'melancholic'
  | 'grateful';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Memory {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  coordinates?: Coordinates;
  emotion: Emotion;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MemoryAnalysis {
  description: string;
  emotion: Emotion;
}

export interface AddMemoryInput {
  title: string;
  date: string;
  location: string;
  image: File;
}

export interface ProfileInsights {
  mostFrequentEmotion: Emotion | null;
  activeMemoryPeriods: string[];
}
