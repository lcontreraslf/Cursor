import React from 'react';
import { Button } from './button';
import { Separator } from './separator';
import { type PropertyFilters, type PropertyType } from '../../types';
import PriceRangeFilter from './price-range-filter';
import RoomFilter from './room-filter';
import CheckboxGroupFilter from './CheckboxGroupFilter';
import PropertyTypeFilter from './PropertyTypeFilter';
import { 
  SwimmingPool, 
  Barbell, 
  Car, 
  ShieldCheck, 
  WifiHigh, 
  Fan 
} from '@phosphor-icons/react';

interface FilterDrawerProps {
  onClose: () => void;
  filters: Partial<PropertyFilters>;
  onFilterChange: (newFilters: Partial<PropertyFilters>) => void;
  onClearFilters: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ 
  onClose, 
  filters, 
  onFilterChange,
  onClearFilters
}) => {
  const handleAmenityChange = (amenity: string) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    onFilterChange({ amenities: newAmenities });
  };
  
  const amenitiesList = [
    { value: 'pool', label: 'Piscina', icon: <SwimmingPool size={24} /> },
    { value: 'gym', label: 'Gimnasio', icon: <Barbell size={24} /> },
    { value: 'garage', label: 'Parking', icon: <Car size={24} /> },
    { value: 'security', label: 'Seguridad', icon: <ShieldCheck size={24} /> },
    { value: 'wifi', label: 'Wifi', icon: <WifiHigh size={24} /> },
    { value: 'ac', label: 'A/C', icon: <Fan size={24} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-6 space-y-8">
        <PropertyTypeFilter
          value={filters.propertyType || 'all'}
          onChange={(value) => onFilterChange({ propertyType: value })}
        />
        <Separator />
        <PriceRangeFilter
          value={[filters.priceRange?.min || 0, filters.priceRange?.max || 500000]}
          onChange={([min, max]) => onFilterChange({ priceRange: { min, max } })}
        />
        <Separator />
        <div>
          <h3 className="text-lg font-medium mb-4">Habitaciones y baños</h3>
          <RoomFilter
            label="Dormitorios"
            value={filters.bedrooms || 0}
            onChange={(value) => onFilterChange({ bedrooms: value })}
          />
          <RoomFilter
            label="Baños"
            value={filters.bathrooms || 0}
            onChange={(value) => onFilterChange({ bathrooms: value })}
          />
        </div>
        <Separator />
        <CheckboxGroupFilter
          title="Servicios"
          options={amenitiesList}
          selected={filters.amenities || []}
          onCheckedChange={handleAmenityChange}
          isMultiSelect
        />
      </div>
      
      <div className="p-4 border-t flex justify-between items-center bg-background shrink-0">
        <Button variant="link" onClick={onClearFilters} className="text-foreground">
          Limpiar filtros
        </Button>
        <Button onClick={onClose} size="lg">
          Mostrar propiedades
        </Button>
      </div>
    </div>
  );
};

export default FilterDrawer;