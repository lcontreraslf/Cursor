import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { properties as allProperties } from "../data/properties";
import { type Property, type PropertyFilters } from "../types";
import { Container } from "../components/ui/container";
import MapView from "../components/ui/map-view";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Funnel,
  MapTrifold,
  Rows,
} from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import PropertyCard from "../components/ui/property-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import FilterDrawer from "../components/ui/filter-drawer";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const initialFilters: Partial<PropertyFilters> = {
  priceRange: { min: 0, max: 500000 },
  bedrooms: 0,
  bathrooms: 0,
  amenities: [],
  propertyType: 'all',
};

const PropertiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [isMapView, setIsMapView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = isMapView ? 6 : 12;
  const [filters, setFilters] = useState<Partial<PropertyFilters>>(initialFilters);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const listingType = searchParams.get("listingType");
    let filtered = allProperties;

    if (listingType === 'sale' || listingType === 'rent') {
      filtered = filtered.filter(p => p.listingType === listingType);
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(p => p.price >= (filters.priceRange?.min || 0) && p.price <= (filters.priceRange?.max || Infinity));
    }
    if (filters.bedrooms && filters.bedrooms > 0) {
      filtered = filtered.filter(p => p.features.bedrooms >= filters.bedrooms!);
    }
    if (filters.bathrooms && filters.bathrooms > 0) {
      filtered = filtered.filter(p => p.features.bathrooms >= filters.bathrooms!);
    }
    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(p => filters.amenities!.every(a => p.amenities.includes(a)));
    }
    
    setProperties(filtered);
    setCurrentPage(1);
  }, [searchParams, filters]);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };
  
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return a.price - b.price;
    }
    if (sortOrder === "price-desc") {
      return b.price - a.price;
    }
    return 0; // 'relevance' or default
  });

  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );
  
  const totalProperties = properties.length;
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  const handleFilterChange = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };
  
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange?.min! > 0 || filters.priceRange?.max! < 500000) count++;
    if (filters.bedrooms! > 0) count++;
    if (filters.bathrooms! > 0) count++;
    if (filters.propertyType !== 'all') count++;
    if (filters.amenities?.length! > 0) count += filters.amenities!.length;
    return count;
  }, [filters]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Container className="py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Propiedades {searchParams.get('listingType') === 'sale' ? 'en Venta' : 'en Arriendo'}
              </h1>
              <p className="text-muted-foreground">
                {totalProperties} resultados encontrados
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-9">
                    <Funnel size={16} className="mr-2" />
                    Filtros
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-2">{activeFilterCount}</Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 h-[90vh]">
                  <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-center">Filtros</DialogTitle>
                  </DialogHeader>
                  <FilterDrawer
                    onClose={() => setIsFilterDrawerOpen(false)}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </DialogContent>
              </Dialog>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Ordenar por:</span>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="h-9 w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevancia</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center rounded-md bg-muted p-0.5">
                <Button
                  variant={!isMapView ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsMapView(false)}
                >
                  <Rows size={18} />
                </Button>
                <Button
                  variant={isMapView ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsMapView(true)}
                >
                  <MapTrifold size={18} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="flex flex-col gap-8 lg:flex-row">
            {isMapView && (
              <div className="lg:w-7/12 h-[400px] lg:h-[calc(100vh-280px)] rounded-lg overflow-hidden shadow-lg bg-muted sticky top-24">
                <MapView
                  properties={sortedProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            )}

            <div className={cn("w-full transition-all duration-300", isMapView ? "lg:w-5/12" : "lg:w-full")}>
              {totalProperties === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  <p className="text-xl font-medium mb-2">
                    No se encontraron propiedades.
                  </p>
                  <p>Prueba modificando los filtros.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
                  {paginatedProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      onClick={() => handlePropertySelect(property)}
                      isSelected={selectedProperty?.id === property.id}
                      variant="list"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {totalProperties > propertiesPerPage && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }}
                      className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      }}
                      className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default PropertiesPage;
