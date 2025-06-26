// src/components/MapPicker.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

interface MapPickerProps {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}

const MapClickHandler: React.FC<{ setPosition: (pos: [number, number]) => void }> = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
};

const MapPicker: React.FC<MapPickerProps> = ({ position, setPosition }) => {
  const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  return (
    <MapContainer center={position} zoom={10} scrollWheelZoom={true} className="h-64 rounded">
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler setPosition={setPosition} />
      <Marker position={position} icon={markerIcon} />
    </MapContainer>
  );
};

export default MapPicker;
