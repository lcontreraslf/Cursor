// src/components/ui/property-grid.tsx

import React from "react";
import { Property } from "../../types";
import PropertyCard from "./property-card";

interface PropertyGridProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  compact?: boolean; // ← ya no se usará, pero lo dejamos por compatibilidad si quieres
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onPropertySelect,
}) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      }}
    >
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
