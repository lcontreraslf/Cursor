import React, { useState } from 'react';
import { Button } from './button';
import FilterDrawer from './filter-drawer';

interface FilterDrawerButtonProps {
  children: React.ReactNode;
}

const FilterDrawerButton: React.FC<FilterDrawerButtonProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" className="flex items-center" onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      {isOpen && <FilterDrawer onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FilterDrawerButton;
