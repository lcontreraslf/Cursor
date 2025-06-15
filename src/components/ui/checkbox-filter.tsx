import React from 'react';
import { Checkbox } from './checkbox';
import { Label } from './label';

interface CheckboxFilterProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`checkbox-${id}`}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label
        htmlFor={`checkbox-${id}`}
        className="text-sm font-normal leading-none cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
};

export default CheckboxFilter;