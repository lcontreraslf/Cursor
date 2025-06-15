import React from 'react';
import { Badge } from './badge';

interface PropertyAmenitiesProps {
  amenities: string[];
}

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  // Function to format amenity names (e.g. "pool" -> "Pool", "bbq area" -> "BBQ Area")
  const formatAmenityName = (name: string): string => {
    return name
      .split(' ')
      .map((word) => 
        word === 'bbq' || word === 'hvac' ? word.toUpperCase() : 
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Amenities</h2>
      
      {amenities.length === 0 ? (
        <p className="text-muted-foreground">No amenities listed for this property.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <Badge key={index} variant="outline" className="text-sm py-1.5">
              {formatAmenityName(amenity)}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};