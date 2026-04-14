import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { MemoryGrid } from '../components/MemoryGrid';
import { UploadModal } from '../components/UploadModal';
import { useMemoryStore } from '../store/memoryStore';

export const DashboardPage = () => {
  const { searchResults, currentQuery, isLoading, isSemanticSearching, semanticSearch, setUploadModalOpen, loadMemories } = useMemoryStore();

  useEffect(() => {
    void loadMemories();
  }, [loadMemories]);

  return (
    <div className="space-y-6">
      <Header query={currentQuery} isSearching={isSemanticSearching} onSearch={(q) => void semanticSearch(q)} onOpenUpload={() => setUploadModalOpen(true)} />
      <MemoryGrid memories={searchResults} isLoading={isLoading} isSemanticSearching={isSemanticSearching} onCreate={() => setUploadModalOpen(true)} />
      <UploadModal />
    </div>
  );
};
