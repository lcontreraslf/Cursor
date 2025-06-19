// src/components/ui/property-card.tsx
import React from "react";
import { type Property } from "../../types";
import { CardContent } from "./card";
import {
  Bed,
  Bathtub,
  Ruler,
  Heart,
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
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(property.id);
  };

  const imageUrl =
    property.images?.[0] || "/assets/placeholders/default.jpg";

  return (
    <div
      className={cn(
        "group rounded-2xl shadow-md hover:shadow-lg transition-all bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Imagen cuadrada con esquinas redondeadas */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Badge */}
        <Badge
          className={cn(
            "absolute top-3 left-3 px-2 py-1 text-xs font-semibold uppercase tracking-wide shadow-md",
            property.listingType === "sale"
              ? "bg-blue-600 text-white"
              : "bg-emerald-600 text-white"
          )}
        >
          {property.listingType === "sale" ? "En Venta" : "En Arriendo"}
        </Badge>

        {/* Favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
        >
          <Heart
            size={18}
            weight={isFavorite ? "fill" : "regular"}
            className={cn(
              "transition-colors stroke-2",
              isFavorite ? "text-red-500" : "text-gray-600"
            )}
          />
        </button>
      </div>

      {/* Contenido */}
      <CardContent className="p-4 flex flex-col gap-1.5">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2">
          {property.title}
        </h3>

        <div className="text-base font-bold text-neutral-800">
          ${property.price.toLocaleString()}
          {property.listingType === "rent" && (
            <span className="text-xs font-normal text-muted-foreground"> /mes</span>
          )}
        </div>

        <div className="flex gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed size={14} />
            {property.features.bedrooms}
          </div>
          <div className="flex items-center gap-1.5">
            <Bathtub size={14} />
            {property.features.bathrooms}
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler size={14} />
            {property.features.area} m²
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default PropertyCard;
