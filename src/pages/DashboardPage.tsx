import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { MemoryGrid } from '../components/memory/MemoryGrid';
import { UploadModal } from '../components/modals/UploadModal';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { useMemoryStore } from '../store/memoryStore';
import { useUiStore } from '../store/uiStore';

export const DashboardPage = () => {
  const { loadMemories, runSemanticSearch, visibleMemories, loading, error } = useMemoryStore();
  const openUpload = useUiStore((state) => state.openUpload);

  useEffect(() => {
    void loadMemories();
  }, [loadMemories]);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-5 backdrop-blur">
      <Header onOpenUpload={openUpload} onSearch={runSemanticSearch} searchLoading={loading} />
      {error ? <p className="mb-4 rounded-lg bg-red-900/50 p-3 text-sm text-red-100">{error}</p> : null}
      {loading ? <LoadingSkeleton /> : null}
      {!loading && visibleMemories.length > 0 ? <MemoryGrid memories={visibleMemories} /> : null}
      {!loading && visibleMemories.length === 0 ? (
        <EmptyState title="No matching memories" description="AI semantic search could not find close matches yet. Upload a memory to build your vector knowledge base." />
      ) : null}
      <UploadModal />
    </div>
  );
};
