// src/components/ui/property-grid.tsx
import React from 'react';
import { Property } from '../../types';
import PropertyCard from './property-card';

interface PropertyGridProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onPropertySelect }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    // ¡¡CAMBIO CLAVE AQUÍ: grid-cols-1 para una sola columna vertical!!
    <div className="grid grid-cols-1 gap-6"> 
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          onClick={() => onPropertySelect?.(property)}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;