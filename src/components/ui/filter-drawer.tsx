import React from 'react';
import { Button } from './button';
import { usePropertyStore } from '../../store/propertyStore';
import { Separator } from './separator';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { Slider } from './slider';
import {
  WifiHigh,
  ThermometerCold,
  TelevisionSimple,
  Car,
  SwimmingPool,
  ShieldCheck,
  Armchair,
  Key,
} from '@phosphor-icons/react';

interface FilterDrawerProps {
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ onClose }) => {
  const { filters, updateFilters, resetFilters } = usePropertyStore();

  const services = [
    { id: 'wifi', label: 'Wi-Fi', icon: <WifiHigh size={16} /> },
    { id: 'airConditioning', label: 'Aire Acond.', icon: <ThermometerCold size={16} /> },
    { id: 'tv', label: 'Televisor', icon: <TelevisionSimple size={16} /> },
    { id: 'garage', label: 'Estacionamiento', icon: <Car size={16} /> },
    { id: 'pool', label: 'Piscina', icon: <SwimmingPool size={16} /> },
    { id: 'security', label: 'Seguridad', icon: <ShieldCheck size={16} /> },
    { id: 'laundry', label: 'Lavandería', icon: <Armchair size={16} /> },
    { id: 'autonomous', label: 'Autónomo', icon: <Key size={16} /> },
  ];

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-background w-full max-w-md mx-auto rounded-2xl shadow-xl p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Filtros</h2>
          <p className="text-sm text-muted-foreground">
            Refina tu búsqueda con filtros personalizados
          </p>
        </div>

        <Separator />

        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
          {/* Rango de precios */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Rango de Precio</h3>
            <Slider
              min={0}
              max={1000000}
              step={10000}
              defaultValue={[filters.minPrice || 0, filters.maxPrice || 1000000]}
              onValueCommit={([min, max]) => {
                updateFilters({ minPrice: min, maxPrice: max });
              }}
              className="accent-pink-500"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.minPrice?.toLocaleString() || '0'}</span>
              <span>${filters.maxPrice?.toLocaleString() || '1.000.000'}</span>
            </div>
          </div>

          {/* Habitaciones */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Habitaciones</h3>
            <ToggleGroup
              type="single"
              value={filters.bedrooms?.toString() || ''}
              onValueChange={(val) => updateFilters({ bedrooms: val ? parseInt(val) : 0 })}
              className="flex flex-wrap gap-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <ToggleGroupItem
                  key={num}
                  value={num.toString()}
                  className="px-4 py-2 rounded-full border text-sm hover:bg-primary hover:text-white transition"
                >
                  {num}+
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Baños */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Baños</h3>
            <ToggleGroup
              type="single"
              value={filters.bathrooms?.toString() || ''}
              onValueChange={(val) => updateFilters({ bathrooms: val ? parseInt(val) : 0 })}
              className="flex flex-wrap gap-2"
            >
              {[1, 2, 3].map((num) => (
                <ToggleGroupItem
                  key={num}
                  value={num.toString()}
                  className="px-4 py-2 rounded-full border text-sm hover:bg-primary hover:text-white transition"
                >
                  {num}+
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Servicios */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold">Servicios</h3>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => {
                const isSelected = filters.amenities?.[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      updateFilters({
                        amenities: {
                          ...filters.amenities,
                          [s.id]: !isSelected,
                        },
                      });
                    }}
                    className={`px-4 py-2 rounded-full text-sm border transition flex items-center gap-1
                      ${isSelected ? 'bg-primary text-white' : 'hover:bg-muted'}`}
                  >
                    {s.icon} {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t mt-6">
            <Button variant="outline" onClick={handleReset}>
              Limpiar filtros
            </Button>
            <Button onClick={onClose}>Aplicar filtros</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;