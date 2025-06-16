import React from 'react';
import { type Property } from '../../types';
import { Card, CardContent } from './card'; 
import { MapPin, Bed, Bathtub, Ruler } from '@phosphor-icons/react'; 
import { Link } from 'react-router-dom';
import { Badge } from './badge';
import { cn } from '../../lib/utils'; 
import { Button } from './button'; 

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick, className }) => {
  return (
    <Card 
      className={cn(
        "flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
        "w-full",
        "min-w-[250px]",
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-muted-foreground">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <span>Sin imagen</span>
        )}
        <Badge 
          className={cn(
            "absolute top-2 left-2 px-2 py-1 text-xs font-semibold uppercase",
            property.listingType === 'sale' ? "bg-blue-500 text-white" : "bg-green-500 text-white"
          )}
        >
          {property.listingType === 'sale' ? 'En Venta' : 'En Arriendo'}
        </Badge>
      </div>

      <CardContent className="p-4 flex flex-col flex-grow">
        <Link to={`/properties/${property.id}`} className="hover:underline">
          <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">{property.title}</h3>
        </Link>

        <p className="text-primary text-xl font-bold mb-2">
          ${property.price.toLocaleString()}
          {property.listingType === 'rent' && <span className="text-sm font-normal text-muted-foreground">/mes</span>}
        </p>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0" /> 
          <span className="line-clamp-1">{property.address.city}, {property.address.state}</span> 
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-muted-foreground mb-3"> 
          <div className="flex items-center">
            <Bed size={16} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.features.bedrooms} Dorm.</span>
          </div>
          <div className="flex items-center">
            <Bathtub size={16} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.features.bathrooms} Baños</span>
          </div>
          <div className="flex items-center col-span-2"> 
            <Ruler size={16} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.features.area} m²</span>
          </div>
        </div>

        <Link to={`/properties/${property.id}`} className="mt-auto">
          <Button variant="outline" className="w-full mt-4">Ver Detalles</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;