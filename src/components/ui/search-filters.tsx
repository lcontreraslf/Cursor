import React, { useState } from 'react';
import {
  MagnifyingGlass,
  MapPin,
  HouseLine,
  CurrencyDollar,
  Ruler,
  Bed,
  Bathtub
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface SearchFiltersProps {
  variant?: 'hero' | 'inline';
  onSearch?: () => void; // Nueva prop
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ variant = 'inline', onSearch }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sizeRange, setSizeRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set('location', location);
    if (propertyType) params.set('propertyType', propertyType);
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.set('priceMin', min);
      if (max) params.set('priceMax', max);
    }
    if (sizeRange) params.set('minArea', sizeRange);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);

    navigate(`/properties?${params.toString()}`);
    if (onSearch) onSearch();
  };

  const inputBaseStyle =
    'w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]';

  return (
    <div
      className={cn(
        'w-full max-w-6xl mx-auto p-4 rounded-2xl shadow-md',
        variant === 'hero' ? 'bg-white bg-opacity-90 backdrop-blur-md' : 'bg-white'
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Ciudad o barrio"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputBaseStyle}
          />
        </div>
        <div className="relative">
          <HouseLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className={inputBaseStyle}
          >
            <option value="">Tipo de propiedad</option>
            <option value="house">Casa</option>
            <option value="apartment">Departamento</option>
            <option value="studio">Estudio</option>
          </select>
        </div>
        <div className="relative">
          <CurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={inputBaseStyle}
          >
            <option value="">Rango de precio (UF)</option>
            <option value="0-5000">UF 0 - 5.000</option>
            <option value="5000-10000">UF 5.000 - 10.000</option>
            <option value="10000-15000">UF 10.000 - 15.000</option>
            <option value="15000-20000">UF 15.000 - 20.000</option>
            <option value="20000+">UF 20.000 o más</option>
          </select>
        </div>
        <div className="relative">
          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={sizeRange}
            onChange={(e) => setSizeRange(e.target.value)}
            className={inputBaseStyle}
          >
            <option value="">Tamaño (m²)</option>
            <option value="any">Indiferente</option>
            <option value="0-45">Desde 0-45 m²</option>
            <option value="46-90">Desde 46-90 m²</option>
            <option value="91-150">Desde 91-150 m²</option>
            <option value="151-200">Desde 151-200 m²</option>
            <option value="200+">200 m² o más</option>
          </select>
        </div>
        <div className="relative">
          <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className={inputBaseStyle}
          >
            <option value="">Habitaciones</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4 o más</option>
          </select>
        </div>
        <div className="relative">
          <Bathtub className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className={inputBaseStyle}
          >
            <option value="">Baños</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4 o más</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <MagnifyingGlass size={20} /> Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;