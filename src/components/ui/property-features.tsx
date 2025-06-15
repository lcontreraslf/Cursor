import React from 'react';
import { Bath as BathtubIcon, BedDouble, Car, Ruler, CalendarRange } from 'lucide-react';
import { formatArea } from '../../utils/format';

interface PropertyFeaturesProps {
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    garage: number;
    yearBuilt?: number;
  };
}

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  const featureItems = [
    {
      icon: <BedDouble className="h-5 w-5" />,
      value: features.bedrooms,
      label: `Bedroom${features.bedrooms !== 1 ? 's' : ''}`,
    },
    {
      icon: <BathtubIcon className="h-5 w-5" />,
      value: features.bathrooms,
      label: `Bathroom${features.bathrooms !== 1 ? 's' : ''}`,
    },
    {
      icon: <Ruler className="h-5 w-5" />,
      value: formatArea(features.area),
      label: 'Area',
      isText: true,
    },
    {
      icon: <Car className="h-5 w-5" />,
      value: features.garage,
      label: `Garage Space${features.garage !== 1 ? 's' : ''}`,
    }
  ];

  // Add year built if available
  if (features.yearBuilt) {
    featureItems.push({
      icon: <CalendarRange className="h-5 w-5" />,
      value: features.yearBuilt,
      label: 'Year Built',
    });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Features</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {featureItems.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-accent/40 rounded-lg"
          >
            <div className="mb-2 text-muted-foreground">
              {feature.icon}
            </div>
            <div className="text-lg font-medium">
              {feature.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {feature.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};