// src/components/ui/search-filters.tsx
import React from 'react';
import { Input } from './input';
import { Button } from './button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { usePropertyStore } from '../../store/propertyStore';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { PropertyType } from '../../types';

interface SearchFiltersProps {
  className?: string;
  onSearch?: () => void;
  simplified?: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  className = '', 
  onSearch,
  simplified = false
}) => {
  const { filters, setFilters } = usePropertyStore(); 
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch();
    }
  };
  
  const listingTypes = [
    { value: 'all', label: 'Buy & Rent' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ];
  
  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', 'label': 'Condo' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' }
  ];
  
  const handleChangeListingType = (value: string) => {
    setFilters({ listingType: value === 'all' ? undefined : value });
  };
  
  const handleChangePropertyType = (value: string) => {
    setFilters({ propertyType: value === 'all' ? undefined : value as PropertyType });
  };
  
  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className={`grid ${simplified ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-4'} gap-2`}>
        <div>
          <Input 
            placeholder="Location"
            value={filters.location || ''}
            onChange={(e) => setFilters({ location: e.target.value })} 
            className="h-[46px]"
          />
        </div>
        
        {!simplified && (
          <div>
            <Select 
              value={filters.listingType || 'all'} 
              onValueChange={handleChangeListingType}
            >
              <SelectTrigger className="h-[46px]">
                <SelectValue placeholder="Buy or Rent" />
              </SelectTrigger>
              <SelectContent>
                {listingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {!simplified && (
          <div>
            <Select 
              value={filters.propertyType || 'all'} 
              onValueChange={handleChangePropertyType}
            >
              <SelectTrigger className="h-[46px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <Button 
            type="submit" 
            className="w-full h-[46px] bg-blue-500 text-white hover:bg-blue-600" // <-- ¡CLASES DE COLOR AZUL DE "FOR SALE"!
            onClick={handleSearch}
          >
            <MagnifyingGlass size={18} className="mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchFilters;