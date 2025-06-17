import React, { useState } from 'react';
import { Button } from './button';
import { Sheet, SheetTrigger, SheetContent } from './sheet';
import FilterDrawer from './filter-drawer';

interface FilterDrawerButtonProps {
  children: React.ReactNode;
}

const FilterDrawerButton: React.FC<FilterDrawerButtonProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center">
          {children}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md">
        <FilterDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawerButton;
