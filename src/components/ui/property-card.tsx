// src/components/ui/property-card.tsx
import React, { useState } from "react";
import { type Property } from "../../types";
import { CardContent } from "./card";
import {
  Bed,
  Bathtub,
  Ruler,
  Heart,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Badge } from "./badge";
import { cn } from "../../lib/utils";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  className?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (propertyId: string) => void;
  variant?: 'grid' | 'list';
  isSelected?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  className,
  isFavorite = false,
  onFavoriteToggle,
  variant = 'grid',
  isSelected = false,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(property.id);
  };

  const images = property.images?.length ? property.images : ["/assets/placeholders/default.jpg"];
  const imageUrl = images[imageIndex];

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const isList = variant === 'list';

  return (
    <div
      className={cn(
        "group rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer",
        isList ? "flex flex-row" : "flex flex-col",
        isSelected && "ring-2 ring-primary ring-offset-2 dark:ring-offset-zinc-900",
        className
      )}
      onClick={onClick}
    >
      <div className={cn("relative overflow-hidden", isList ? "w-1/3 aspect-[4/3] p-2" : "w-full aspect-[4/3]")}>
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <CaretLeft size={16} className="text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <CaretRight size={16} className="text-gray-800" />
        </button>

        <Badge
          className={cn(
            "absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow",
            property.listingType === "sale"
              ? "bg-blue-600 text-white"
              : "bg-emerald-600 text-white"
          )}
        >
          {property.listingType === "sale" ? "En Venta" : "En Arriendo"}
        </Badge>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            weight={isFavorite ? "fill" : "regular"}
            className={cn("transition-colors", isFavorite ? "text-red-500" : "text-gray-700")}
          />
        </button>
      </div>

      <CardContent className={cn("flex flex-col flex-grow", isList ? "w-2/3 p-4" : "p-3")}>
        <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{property.address.city}, {property.address.state}</p>
        <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          ${property.price.toLocaleString()}
          {property.listingType === "rent" && (
            <span className="text-sm font-normal text-muted-foreground"> /mes</span>
          )}
        </div>
        <div className="mt-auto pt-3 flex gap-4 text-sm text-muted-foreground border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Bed size={16} />
            <span>{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bathtub size={16} />
            <span>{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler size={16} />
            <span>{property.features.area} m²</span>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default PropertyCard;
