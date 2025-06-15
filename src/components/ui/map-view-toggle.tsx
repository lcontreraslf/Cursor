import React from 'react';
import { Button } from './button';
import { Grid, Map } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

interface MapViewToggleProps {
  isMapView: boolean;
  onToggle: () => void;
}

const MapViewToggle: React.FC<MapViewToggleProps> = ({ isMapView, onToggle }) => {
  return (
    <ToggleGroup type="single" value={isMapView ? 'map' : 'grid'} onValueChange={(value) => {
      if (value === 'map' && !isMapView) onToggle();
      if (value === 'grid' && isMapView) onToggle();
    }}>
      <ToggleGroupItem value="grid" aria-label="Grid view" title="Grid view">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="map" aria-label="Map view" title="Map view">
        <Map className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default MapViewToggle;