// src/pages/PropertiesPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '../components/ui/container';
import SearchFilters from '../components/ui/search-filters';
import PropertyGrid from '../components/ui/property-grid'; // Componente para la cuadrícula de propiedades
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import FilterDrawerButton from '../components/ui/filter-drawer-button';
import MapViewToggle from '../components/ui/map-view-toggle';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import MapView from '../components/ui/map-view'; // Componente para la vista de mapa
import { usePropertyStore, convertSearchParamsToFilters, PROPERTIES_PER_PAGE } from '../store/propertyStore';
import { type Property } from '../types';
import { FunnelSimple as Filter, SortAscending, SortDescending } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PropertiesPage: React.FC = () => {
  const { 
    properties = [],
    filters, 
    totalProperties, 
    currentPage, 
    setPage, 
    fetchProperties,
    setFilters
  } = usePropertyStore();

  const [isMapView, setIsMapView] = useState(true); // Cambiado a true para que inicie en vista de mapa
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sortOption, setSortOption] = useState('relevance');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters = convertSearchParamsToFilters(searchParams);
    
    const currentFiltersString = JSON.stringify(filters);
    const combinedFilters = { ...filters, ...urlFilters }; 
    const urlFiltersString = JSON.stringify(combinedFilters);
    
    if (currentFiltersString !== urlFiltersString) {
      setFilters(urlFilters);
    } else {
      fetchProperties(); 
    }

  }, [location.search, fetchProperties, setFilters]);


  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };
  
  const handleClearFilters = () => {
    usePropertyStore.getState().resetFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.listingType && filters.listingType !== 'all') count++;
    if (filters.propertyType && filters.propertyType !== 'all') count++;
    if (filters.priceRange?.min || filters.priceRange?.max) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.amenities && filters.amenities.length > 0) {
      count += filters.amenities.length;
    }
    return count;
  };

  const getSortedProperties = () => {
    if (!properties) return []; 
    
    const sortedProperties = [...properties];
    
    if (sortOption === 'price') {
      sortedProperties.sort((a, b) => {
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      });
    } else if (sortOption === 'date') {
      sortedProperties.sort((a, b) => {
        const dateA = a.listedDate ? new Date(a.listedDate).getTime() : 0;
        const dateB = b.listedDate ? new Date(b.listedDate).getTime() : 0;
        return sortDirection === 'asc' 
          ? dateA - dateB
          : dateB - dateA;
      });
    }
    
    return sortedProperties;
  };
  
  const sortedProperties = getSortedProperties();

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Container className="py-8">
          <h1 className="text-3xl font-bold mb-6">Find Your Dream Property</h1>
          
          <div className="mb-6">
            <SearchFilters onSearch={() => setPage(1)} />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-2 py-1">
                {totalProperties} Results
              </Badge>
              
              {getActiveFiltersCount() > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <div className="hidden sm:block">
                <MapViewToggle 
                  isMapView={isMapView} 
                  onToggle={() => setIsMapView(!isMapView)}
                />
              </div>
              
              <FilterDrawerButton>
                <Filter size={20} className="mr-2" /> 
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </FilterDrawerButton>
              
              <div className="w-[160px]">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="date">Date Listed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleSortDirection}
                className={cn(sortOption === 'relevance' && "opacity-50 cursor-not-allowed")}
                disabled={sortOption === 'relevance'}
              >
                {sortDirection === 'asc' ? <SortAscending size={20} /> : <SortDescending size={20} />}
              </Button>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          {/* ¡¡CAMBIO CRUCIAL AQUÍ: Layout de dos columnas para el mapa y las propiedades!! */}
          <div className={cn(
            "flex flex-col gap-6",
            // Si isMapView es true, se convierte en fila en pantallas grandes y ocupa una altura específica
            isMapView ? "lg:flex-row h-[calc(100vh-250px)]" : "", 
            "relative"
          )}>
            {isMapView && ( // Columna Izquierda: Mapa
              // CAMBIO DE ANCHO: de lg:flex-1 a lg:w-3/5
              <div className="relative lg:w-3/5 h-[400px] lg:h-full rounded-lg overflow-hidden shadow-lg bg-muted">
                <MapView 
                  properties={sortedProperties} 
                  selectedProperty={selectedProperty} 
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            )}
            
            {/* Columna Derecha: Contenedor de PropertyGrid */}
            <div className={cn(
              // CAMBIO DE ANCHO: de lg:w-1/3 xl:w-1/4 a lg:w-2/5
              isMapView ? "lg:w-2/5 lg:max-h-full overflow-y-auto" : "w-full", 
              "flex flex-col gap-6"
            )}>
              {totalProperties === 0 ? ( 
                <div className="py-20 text-center text-muted-foreground">
                  <p className="text-xl font-medium mb-2">No properties found.</p>
                  <p>Try adjusting your search criteria.</p>
                </div>
              ) : (
                <PropertyGrid 
                  properties={sortedProperties} 
                  onPropertySelect={handlePropertySelect}
                />
              )}
            </div>
          </div>
          
          {/* Pagination (siempre visible, pero los números solo si hay más de una página) */}
          {totalProperties > PROPERTIES_PER_PAGE && (
            <div className="mt-8 flex justify-center">
              <ToggleGroup 
                type="single" 
                value={`${currentPage}`} 
                onValueChange={(value) => {
                  if (value) setPage(parseInt(value));
                }}
              >
                {Array.from({ length: Math.ceil(totalProperties / PROPERTIES_PER_PAGE) }).map((_, i) => (
                  <ToggleGroupItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;