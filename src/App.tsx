import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { MemoryDetailPage } from './pages/MemoryDetailPage';
import { useMemoryStore } from './store/memoryStore';

const App = () => {
  const loadMemories = useMemoryStore((state) => state.loadMemories);
  const error = useMemoryStore((state) => state.error);

  useEffect(() => {
    void loadMemories();
  }, [loadMemories]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/memory/:id" element={<MemoryDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
