import React from 'react';
import { cn } from '../../lib/utils';
import { House, Buildings, HouseLine, BuildingApartment } from '@phosphor-icons/react';
import { type PropertyType } from '../../types';

interface PropertyTypeOption {
  value: PropertyType;
  label: string;
  icon: React.ReactNode;
}

const propertyTypeOptions: PropertyTypeOption[] = [
  { value: 'house', label: 'Casa', icon: <House size={28} /> },
  { value: 'apartment', label: 'Departamento', icon: <BuildingApartment size={28} /> },
  { value: 'condo', label: 'Condominio', icon: <Buildings size={28} /> },
  { value: 'townhouse', label: 'Townhouse', icon: <HouseLine size={28} /> },
];

interface PropertyTypeFilterProps {
  value: PropertyType | 'all';
  onChange: (value: PropertyType) => void;
}

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Tipo de alojamiento</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {propertyTypeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "p-4 rounded-lg border-2 text-left space-y-2 transition-all duration-200",
              value === option.value
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            )}
          >
            {option.icon}
            <p className="font-medium text-sm">{option.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypeFilter; 