import React from "react";
import { type Property } from "../../types";
import { Card, CardContent } from "./card";
import { MapPin, Bed, Bathtub, Ruler } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Badge } from "./badge";
import { cn } from "../../lib/utils";
import { Button } from "./button";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  className,
}) => {
  return (
    <Card
      className={cn(
        "box-border w-full max-w-none flex flex-col overflow-hidden shadow-md transition-shadow duration-200",
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-36 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-muted-foreground">
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
            "absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase",
            property.listingType === "sale"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          )}
        >
          {property.listingType === "sale" ? "En Venta" : "En Arriendo"}
        </Badge>
      </div>

      <CardContent className="p-3 flex flex-col flex-grow text-sm">
        <Link to={`/properties/${property.id}`} className="hover:underline">
          <h3 className="text-[14px] font-semibold text-foreground mb-1 line-clamp-2">
            {property.title}
          </h3>
        </Link>

        <p className="text-primary text-base font-bold mb-1">
          ${property.price.toLocaleString()}
          {property.listingType === "rent" && (
            <span className="text-xs font-normal text-muted-foreground">
              /mes
            </span>
          )}
        </p>

        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1">
            {property.address.city}, {property.address.state}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <Bed size={14} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.features.bedrooms} Dorm.
            </span>
          </div>
          <div className="flex items-center">
            <Bathtub size={14} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.features.bathrooms} Baños
            </span>
          </div>
          <div className="flex items-center col-span-2">
            <Ruler size={14} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.features.area} m²</span>
          </div>
        </div>

        <Link to={`/properties/${property.id}`} className="mt-auto">
          <Button variant="outline" className="w-full mt-2 text-xs py-1.5">
            Ver Detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
