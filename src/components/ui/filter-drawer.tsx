import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet';
import { Button } from './button';
import { X } from '@phosphor-icons/react';
import { usePropertyStore } from '../../store/propertyStore';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';
import PriceRangeFilter from './price-range-filter';
import RoomFilter from './room-filter';
import CheckboxFilter from './checkbox-filter';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const { filters, updateFilters, resetFilters } = usePropertyStore();
  
  const amenities = [
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'gym', label: 'Fitness Center' },
    { id: 'garage', label: 'Garage' },
    { id: 'security', label: 'Security System' },
    { id: 'airConditioning', label: 'Air Conditioning' },
    { id: 'heating', label: 'Heating' },
    { id: 'laundry', label: 'Laundry' },
    { id: 'patio', label: 'Patio/Balcony' },
  ];
  
  const handleReset = () => {
    resetFilters();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[300px] sm:w-[450px] p-0">
        <SheetHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          <SheetDescription>
            Refine your property search
          </SheetDescription>
        </SheetHeader>
        
        <Separator />
        
        <ScrollArea className="h-[calc(100vh-120px)] p-6">
          <div className="space-y-6">
            {/* Price Range */}
            <PriceRangeFilter
              value={[filters.minPrice || 0, filters.maxPrice || 1000000]}
              onChange={(values) => {
                updateFilters({ 
                  minPrice: values[0], 
                  maxPrice: values[1] 
                });
              }}
            />
            
            <Separator />
            
            {/* Room Filters */}
            <div className="space-y-4">
              <h3 className="font-medium">Rooms</h3>
              <div className="grid grid-cols-2 gap-4">
                <RoomFilter
                  label="Bedrooms"
                  value={filters.bedrooms || 0}
                  onChange={(value) => updateFilters({ bedrooms: value })}
                />
                <RoomFilter
                  label="Bathrooms"
                  value={filters.bathrooms || 0}
                  onChange={(value) => updateFilters({ bathrooms: value })}
                />
              </div>
            </div>
            
            <Separator />
            
            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="font-medium">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-2">
                {amenities.map((amenity) => (
                  <CheckboxFilter
                    key={amenity.id}
                    id={amenity.id}
                    label={amenity.label}
                    checked={!!filters.amenities?.[amenity.id]}
                    onChange={(checked) => {
                      updateFilters({
                        amenities: {
                          ...filters.amenities,
                          [amenity.id]: checked
                        }
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleReset}>
              Reset All
            </Button>
            <Button onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;