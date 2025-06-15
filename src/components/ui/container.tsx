import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  fluid = false, 
}) => {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6',
        {
          'max-w-none': fluid,
          'max-w-screen-2xl': !fluid
        },
        className
      )}
    >
      {children}
    </div>
  );
};