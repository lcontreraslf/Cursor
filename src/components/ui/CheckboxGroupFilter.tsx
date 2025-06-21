import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';

interface CheckboxOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface CheckboxGroupFilterProps {
  title: string;
  options: CheckboxOption[];
  selected: string[];
  onCheckedChange: (value: string) => void;
  isMultiSelect?: boolean;
}

const CheckboxGroupFilter: React.FC<CheckboxGroupFilterProps> = ({
  title,
  options,
  selected,
  onCheckedChange,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? options : options.slice(0, 4);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {visibleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onCheckedChange(option.value)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left",
              selected.includes(option.value)
                ? "border-foreground bg-muted"
                : "border-border hover:border-foreground/50"
            )}
          >
            {option.icon}
            <span className="font-medium text-sm">{option.label}</span>
          </button>
        ))}
      </div>
      {options.length > 4 && (
        <Button variant="link" onClick={() => setShowAll(!showAll)} className="px-0 text-foreground font-semibold underline hover:no-underline">
          {showAll ? 'Mostrar menos' : `Mostrar más`}
        </Button>
      )}
    </div>
  );
};

export default CheckboxGroupFilter; 