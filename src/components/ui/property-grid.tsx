import React from "react";
import { Property } from "../../types";
import PropertyCard from "./property-card";

interface PropertyGridProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  compact?: boolean;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onPropertySelect,
  compact = false,
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

  const gridClasses = compact
    ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4";

  return (
    <div className={gridClasses}>
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
