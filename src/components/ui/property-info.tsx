import React from 'react';
import { Property } from '../../types';
import { formatPrice } from '../../utils/format';
import { Badge } from './badge';

interface PropertyInfoProps {
  property: Property;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const listingTypeDisplay = property.listingType === 'sale' ? 'For Sale' : 'For Rent';
  const priceDisplay = formatPrice(property.price, property.currency);
  
  // Function to format property type (e.g. "house" -> "House", "apartment" -> "Apartment")
  const formatPropertyType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={property.listingType === 'sale' ? 'default' : 'secondary'} className="px-3 py-1.5">
          {listingTypeDisplay}
        </Badge>
        <Badge variant="outline" className="px-3 py-1.5">
          {formatPropertyType(property.propertyType)}
        </Badge>
        <div className="text-3xl font-bold ml-auto">
          {property.listingType === 'rent' ? `${priceDisplay}/month` : priceDisplay}
        </div>
      </div>
    </div>
  );
};