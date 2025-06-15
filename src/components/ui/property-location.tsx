import React from 'react';

interface PropertyLocationProps {
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export const PropertyLocation: React.FC<PropertyLocationProps> = ({ location }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Address Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
        <div>
          <div className="text-sm text-muted-foreground">Street</div>
          <div>{location.street}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">City</div>
          <div>{location.city}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">State</div>
          <div>{location.state}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Zip Code</div>
          <div>{location.zipCode}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Country</div>
          <div>{location.country}</div>
        </div>
      </div>
    </div>
  );
};