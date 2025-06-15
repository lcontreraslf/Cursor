import React from 'react';

interface PropertyDescriptionProps {
  description: string;
}

export const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ description }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Description</h2>
      <div className="text-muted-foreground whitespace-pre-line">
        <p>{description}</p>
      </div>
    </div>
  );
};