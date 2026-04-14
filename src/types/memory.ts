export type Emotion =
  | 'joy'
  | 'nostalgia'
  | 'calm'
  | 'surprise'
  | 'sadness'
  | 'gratitude'
  | 'mixed';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Memory {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  coordinates?: GeoPoint;
  emotion: Emotion;
  description: string;
  similarityScore?: number;
  createdAt: string;
}

export interface MemoryDraft {
  title: string;
  date: string;
  location: string;
  image: File;
}

export interface AnalyzedMemoryPreview {
  description: string;
  emotion: Emotion;
  embeddingStatus: 'generated';
}

export interface UserInsight {
  mostFrequentEmotion?: Emotion;
  activePeriods: string[];
}
