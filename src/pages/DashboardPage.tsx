import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { MemoryGrid } from '../components/memory/MemoryGrid';
import { UploadModal } from '../components/memory/UploadModal';
import { useMemoryStore } from '../store/memoryStore';

export const DashboardPage = () => {
  const {
    visibleMemories,
    query,
    loading,
    searchLoading,
    uploadOpen,
    error,
    loadMemories,
    semanticSearchMemories,
    clearSearch,
    setUploadOpen
  } = useMemoryStore();

  useEffect(() => {
    void loadMemories();
  }, [loadMemories]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=80" className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-20" alt="background" />
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-blue-950/80" />
      <div className="relative mx-auto flex max-w-7xl gap-6 p-4">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <Header
            query={query}
            loading={searchLoading}
            onQueryChange={(value) => void semanticSearchMemories(value)}
            onClear={clearSearch}
            onNew={() => setUploadOpen(true)}
          />
          <MemoryGrid memories={visibleMemories} loading={loading || searchLoading} hasQuery={Boolean(query)} onCreate={() => setUploadOpen(true)} />
        </main>
      </div>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
};
