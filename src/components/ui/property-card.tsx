import React from "react";
import { type Property } from "../../types";
import { Card, CardContent } from "./card";
import { MapPin, Bed, Bathtub, Ruler, ArrowRight, Heart } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
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
  return (
    <Card
      className={cn(
        "group w-full flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-gray-900",
        className
      )}
      style={{ borderRadius: '32px' }}
      onClick={onClick}
    >
      {/* Imagen cuadrada */}
      <div className="relative w-full aspect-square overflow-hidden" style={{ borderRadius: '32px 32px 16px 16px' }}>
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={`${property.title} - ${property.address.city}, ${property.address.state}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-[32px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl mb-2">🏠</div>
              <div className="text-sm font-medium">Sin imagen disponible</div>
            </div>
          </div>
        )}

        {/* Badge con mejor posicionamiento */}
        <Badge
          className={cn(
            "absolute top-3 left-3 px-2 py-1 text-xs font-semibold uppercase tracking-wide shadow-md",
            property.listingType === "sale"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          )}
        >
          {property.listingType === "sale" ? "En Venta" : "En Arriendo"}
        </Badge>

        {/* Botón de favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-105 z-10"
        >
          <Heart 
            size={18} 
            weight={isFavorite ? "fill" : "regular"}
            className={cn(
              "transition-colors duration-200 stroke-2",
              isFavorite ? "text-red-500" : "text-white hover:text-red-100"
            )}
          />
        </button>

        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Contenido compacto */}
      <CardContent className="px-4 pt-3 pb-4 flex flex-col gap-1.5">
        {/* Título */}
        <h3 className="font-medium text-sm leading-tight text-foreground line-clamp-2">
          {property.title}
        </h3>

        {/* Precio */}
        <div className="flex items-baseline gap-1">
          <p className="text-primary text-base font-semibold">
            ${property.price.toLocaleString()}
          </p>
          {property.listingType === "rent" && (
            <span className="text-xs text-muted-foreground">/mes</span>
          )}
        </div>

        {/* Features en una línea con mejor espaciado */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-gray-400" />
            <span className="font-medium">{property.features.bedrooms} Dorm.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bathtub size={14} className="text-gray-400" />
            <span className="font-medium">{property.features.bathrooms} Baños</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler size={14} className="text-gray-400" />
            <span className="font-medium">{property.features.area}m²</span>
          </div>
        </div>

        {/* Ubicación con mejor diseño */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center text-muted-foreground gap-1.5">
            <MapPin size={14} className="text-gray-400" />
            <span className="line-clamp-1 font-medium">
              {property.address.city}, {property.address.state}
            </span>
          </div>
          {/* Espacio para rating futuro */}
          <div className="text-muted-foreground text-xs">
            ⭐ 4.8
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
