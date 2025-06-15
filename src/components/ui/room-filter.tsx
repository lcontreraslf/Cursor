import React from 'react';
import { Label } from './label';
import { Button } from './button';
import { Minus, Plus } from '@phosphor-icons/react';

interface RoomFilterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const RoomFilter: React.FC<RoomFilterProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`room-filter-${label.toLowerCase()}`} className="text-sm">
        {label}
      </Label>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus size={16} />
          <span className="sr-only">Decrease {label}</span>
        </Button>
        <div 
          id={`room-filter-${label.toLowerCase()}`}
          className="flex-1 h-8 flex items-center justify-center border-y border-border"
        >
          <span className="text-sm font-medium">
            {value === 0 ? 'Any' : value}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus size={16} />
          <span className="sr-only">Increase {label}</span>
        </Button>
      </div>
    </div>
  );
};

export default RoomFilter;