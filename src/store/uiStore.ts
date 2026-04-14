import { create } from 'zustand';

interface UiState {
  isUploadOpen: boolean;
  isAiAnalyzing: boolean;
  openUpload: () => void;
  closeUpload: () => void;
  setAiAnalyzing: (value: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isUploadOpen: false,
  isAiAnalyzing: false,
  openUpload: () => set({ isUploadOpen: true }),
  closeUpload: () => set({ isUploadOpen: false }),
  setAiAnalyzing: (value) => set({ isAiAnalyzing: value })
}));
