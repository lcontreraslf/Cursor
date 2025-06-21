import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { type Property } from '../../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { cn } from '../../lib/utils';
import { formatPrice } from '../../utils/format';

// Helper to format large numbers into a compact format (e.g., 120000 -> 120K)
const formatCompactPrice = (price: number) => {
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `${Math.round(price / 1000)}K`;
  return price.toString();
};

// Custom component to handle map centering and other events
const MapEvents = ({ selectedProperty }: { selectedProperty: Property | null | undefined }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedProperty?.address.coordinates.lat && selectedProperty?.address.coordinates.lng) {
      map.flyTo([selectedProperty.address.coordinates.lat, selectedProperty.address.coordinates.lng], 15, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [selectedProperty, map]);
  return null;
};

// Custom component for price markers on the map
const PriceMarker = ({ property, isSelected, onSelect }: { property: Property, isSelected: boolean, onSelect: () => void }) => {
  const { lat, lng } = property.address.coordinates;

  const priceLabel = property.listingType === 'rent' 
    ? formatPrice(property.price, 'CLP') 
    : formatCompactPrice(property.price);

  const iconHtml = `
    <div class="${cn(
      'flex items-center justify-center font-bold text-white text-xs rounded-full shadow-md transition-all duration-200',
      'h-8 px-3',
      isSelected
        ? 'bg-blue-600 scale-110 z-10'
        : 'bg-red-500 hover:bg-red-600 hover:scale-105'
    )}">
      ${priceLabel}
    </div>
  `;

  const customIcon = new L.DivIcon({
    html: iconHtml,
    className: '', // Leaflet adds its own classes, we use the inner div
    iconSize: [60, 32],
    iconAnchor: [30, 16],
  });

  return (
    <Marker
      position={[lat, lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onSelect(),
      }}
    />
  );
};


interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
}

const MapView: React.FC<MapViewProps> = ({ properties, selectedProperty, onPropertySelect = () => {} }) => {
  
  const defaultPosition: [number, number] = properties.length > 0 
    ? [properties[0].address.coordinates.lat, properties[0].address.coordinates.lng] 
    : [29.7604, -95.3698]; // Fallback to Houston, TX if no properties

  // This is to avoid server-side rendering issues with Leaflet
  if (typeof window === 'undefined') {
    return <div className="h-full w-full bg-muted animate-pulse" />;
  }
  
  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom={true} className="h-full w-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {properties.map((property) => (
        <PriceMarker
          key={property.id}
          property={property}
          isSelected={selectedProperty?.id === property.id}
          onSelect={() => onPropertySelect(property)}
        />
      ))}
      
      <MapEvents selectedProperty={selectedProperty} />
    </MapContainer>
  );
};

export default MapView;
