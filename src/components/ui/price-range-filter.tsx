import React from 'react';
import { Label } from './label';
import { Slider } from './slider';
import { Input } from './input';

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  value,
  onChange,
  min = 0,
  max = 500000,
  step = 1000,
}) => {
  const [minVal, maxVal] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10);
    if (!isNaN(newMin) && newMin >= min && newMin <= maxVal) {
      onChange([newMin, maxVal]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    if (!isNaN(newMax) && newMax <= max && newMax >= minVal) {
      onChange([minVal, newMax]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Rango de precios</h3>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onChange}
        className="w-full"
      />
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="min-price" className="text-xs text-muted-foreground">Mínimo</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">$</span>
            <Input
              id="min-price"
              type="number"
              value={minVal}
              onChange={handleMinChange}
              className="pl-6"
            />
          </div>
        </div>
        <div className="pt-5 text-muted-foreground">-</div>
        <div className="flex-1">
          <Label htmlFor="max-price" className="text-xs text-muted-foreground">Máximo</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">$</span>
            <Input
              id="max-price"
              type="number"
              value={maxVal}
              onChange={handleMaxChange}
              className="pl-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;