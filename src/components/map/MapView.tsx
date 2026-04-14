import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Memory } from '../../types/memory';

interface MapViewProps {
  memories: Memory[];
}

export const MapView = ({ memories }: MapViewProps) => {
  const centered = memories.find((m) => m.coordinates)?.coordinates ?? { lat: 20, lng: 0 };

  return (
    <div className="h-[70vh] overflow-hidden rounded-2xl border border-white/15">
      <MapContainer center={[centered.lat, centered.lng]} zoom={2} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {memories.filter((m) => m.coordinates).map((memory) => (
          <Marker key={memory.id} position={[memory.coordinates!.lat, memory.coordinates!.lng]}>
            <Popup>
              <p className="font-semibold">{memory.title}</p>
              <p>{memory.location}</p>
              <p>AI emotion: {memory.emotion}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
