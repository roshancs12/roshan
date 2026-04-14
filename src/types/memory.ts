export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Memory {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  emotion: string;
  description: string;
  coordinates?: GeoLocation;
  ai: {
    captionModel: string;
    emotionModel: string;
    embeddingModel: string;
    confidence?: number;
  };
}

export interface AddMemoryPayload {
  title: string;
  date: string;
  location: string;
  image: File;
}

export interface AIAnalysisResult {
  description: string;
  emotion: string;
  confidence?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}
