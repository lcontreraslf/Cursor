import React from 'react';
import { Label } from './label';
import { Slider } from './slider';
import { formatPrice } from '../../utils/format';

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
  max = 1000000,
  step = 5000,
}) => {
  // Format the values for display
  const formattedMinPrice = formatPrice(value[0]);
  const formattedMaxPrice = formatPrice(value[1]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="price-range" className="font-medium">Price Range</Label>
        <span className="text-sm text-muted-foreground">
          {formattedMinPrice} - {formattedMaxPrice}
        </span>
      </div>
      <Slider
        id="price-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onChange}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <div>{formatPrice(min)}</div>
        <div>{formatPrice(max)}</div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;