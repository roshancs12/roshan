import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useMemoryStore } from '../store/memoryStore';

export const MapPage = () => {
  const memories = useMemoryStore((state) => state.memories.filter((m) => m.coordinates));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-blue-200">Memory Map</h1>
      <div className="h-[70vh] overflow-hidden rounded-2xl border border-slate-700">
        <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {memories.map((memory) => (
            <Marker key={memory.id} position={[memory.coordinates!.lat, memory.coordinates!.lng]}>
              <Popup>
                <p className="font-semibold">{memory.title}</p>
                <p>{memory.location}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
