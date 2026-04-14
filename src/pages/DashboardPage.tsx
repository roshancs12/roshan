import { useMemo, useState } from 'react';
import { EmotionFilter } from '../components/EmotionFilter';
import { MemoryGrid } from '../components/MemoryGrid';
import { SearchBar } from '../components/SearchBar';
import { TagFilter } from '../components/TagFilter';
import { TimelineView } from '../components/TimelineView';
import { UploadModal } from '../components/UploadModal';
import { useMemoryStore } from '../store/memoryStore';

export const DashboardPage = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const {
    filteredMemories,
    memories,
    searchQuery,
    filters,
    loading,
    aiProcessing,
    setSearchQuery,
    toggleTagFilter,
    setEmotionFilter,
    clearFilters,
    addMemory
  } = useMemoryStore();

  const allTags = useMemo(() => {
    const tags = memories.flatMap((memory) => memory.tags);
    return Array.from(new Set(tags)).sort();
  }, [memories]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Memory Dashboard</h1>
          <p className="text-sm text-slate-500">Semantic recall for moments, emotions, and context.</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="rounded-lg bg-ai-500 px-4 py-2 text-sm font-medium text-white"
        >
          Upload Memory
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="grid gap-4 lg:grid-cols-2">
        <TagFilter tags={allTags} selectedTags={filters.tags} onToggle={toggleTagFilter} />
        <EmotionFilter value={filters.emotion} onChange={setEmotionFilter} />
      </div>

      <div className="flex justify-end">
        <button onClick={clearFilters} className="text-xs font-medium text-ai-700">Reset all filters</button>
      </div>

      <MemoryGrid memories={filteredMemories} loading={loading} aiProcessing={aiProcessing} />

      <TimelineView memories={filteredMemories} />

      <UploadModal
        open={uploadOpen}
        processing={aiProcessing}
        onClose={() => setUploadOpen(false)}
        onSubmit={addMemory}
      />
    </div>
  );
};
