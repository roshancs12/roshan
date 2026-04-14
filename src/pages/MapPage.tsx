import { MapView } from '../components/map/MapView';
import { useMemoryStore } from '../store/memoryStore';

export const MapPage = () => {
  const memories = useMemoryStore((state) => state.memories);
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/45 p-5 backdrop-blur">
      <h2 className="text-2xl font-bold text-white">Memory Map</h2>
      <MapView memories={memories} />
    </div>
  );
};
