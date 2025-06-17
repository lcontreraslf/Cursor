import React from 'react';
import { type Property } from '../../types';

interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
}

const MapView: React.FC<MapViewProps> = () => {
  return (
    <div className="h-full w-full overflow-hidden rounded-md border border-border shadow-md">
      <img
        src="/assets/mock/map-mockup.jpg" // ✅ ruta relativa desde /public
        alt="Vista del mapa con resultados"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default MapView;
