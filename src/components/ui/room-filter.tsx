import React from 'react';
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
    <div className="flex justify-between items-center py-2">
      <span className="text-base font-normal">{label}</span>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 shrink-0"
          onClick={decrement}
          disabled={value <= min}
        >
          <Minus size={14} />
          <span className="sr-only">Disminuir</span>
        </Button>
        <span className="text-base font-medium min-w-[2ch] text-center">
          {value === 0 ? 'Cualquiera' : value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 shrink-0"
          onClick={increment}
          disabled={value >= max}
        >
          <Plus size={14} />
          <span className="sr-only">Aumentar</span>
        </Button>
      </div>
    </div>
  );
};

export default RoomFilter;