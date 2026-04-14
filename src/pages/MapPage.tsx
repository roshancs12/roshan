import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Sidebar } from '../components/layout/Sidebar';
import { useMemoryStore } from '../store/memoryStore';

export const MapPage = () => {
  const { memories, loadMemories } = useMemoryStore();

  useEffect(() => {
    if (!memories.length) void loadMemories();
  }, [memories.length, loadMemories]);

  const withCoords = memories.filter((memory) => memory.coordinates);

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Sidebar />
        <main className="flex-1 rounded-2xl border border-blue-500/20 bg-slate-900/60 p-6">
          <h1 className="mb-2 text-3xl font-bold text-blue-200">Memory Map</h1>
          <p className="mb-4 text-sm text-blue-200/70">Explore location-aware memories enriched by AI-generated emotion and descriptions.</p>
          <div className="relative h-[70vh] overflow-hidden rounded-xl border border-blue-500/30">
            <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {withCoords.map((memory) => (
                <Marker key={memory.id} position={[memory.coordinates!.lat, memory.coordinates!.lng]}>
                  <Popup>
                    <div className="space-y-1">
                      <img src={memory.image} alt={memory.title} className="h-20 w-full rounded object-cover" />
                      <p className="font-semibold">{memory.title}</p>
                      <p className="text-xs">Emotion: {memory.emotion}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {!withCoords.length ? (
              <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/20 bg-slate-950/90 px-4 py-3 text-sm text-blue-100">
                No memories with locations found. Add a location when creating a memory.
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};
