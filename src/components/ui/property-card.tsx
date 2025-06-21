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
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  className,
  isFavorite = false,
  onFavoriteToggle,
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

  return (
    <div
      className={cn(
        "group rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer flex flex-col",
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
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

      <CardContent className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
          {property.title}
        </h3>
        <div className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
          ${property.price.toLocaleString()}
          {property.listingType === "rent" && (
            <span className="text-xs font-normal text-muted-foreground"> /mes</span>
          )}
        </div>
        <div className="mt-auto pt-2 flex gap-3 text-xs text-muted-foreground border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-1">
            <Bed size={14} />
            <span>{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bathtub size={14} />
            <span>{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={14} />
            <span>{property.features.area} m²</span>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default PropertyCard;
