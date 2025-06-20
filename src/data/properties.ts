// src/data/properties.ts
import { type Property } from '../types';
import { type PropertyFilters, Agent } from '../types';

const placeholderImages = {
  singleTestImage: '/assets/placeholders/casa-1.jpg',
  agents: {
    maria: '/assets/placeholders/agent-maria.jpg',
    john: '/assets/placeholders/agent-john.jpg',
    sarah: '/assets/placeholders/agent-sarah.jpg',
    david: '/assets/placeholders/agent-david.jpg',
    lisa: '/assets/placeholders/agent-lisa.jpg',
  },
};

const agentList: Agent[] = [
  {
    id: 'a1',
    name: 'Agente Prueba',
    email: 'agent@example.com',
    phone: '+1-000-000-0000',
    photo: placeholderImages.agents.maria,
    description:
      'Especialista en propiedades residenciales y comerciales. Atención personalizada y experiencia en toda la Región Metropolitana.',
  },
];

export const getAgentById = (agentId: string): Agent | undefined => {
  return agentList.find((agent) => agent.id === agentId);
};

const baseProperty: Omit<Property, 'id' | 'title'> = {
  description: 'Propiedad de prueba con detalles ficticios.',
  price: 100000,
  currency: 'USD',
  listingType: 'sale',
  propertyType: 'house',
  address: {
    street: '123 Example St',
    city: 'City',
    state: 'State',
    country: 'Country',
    zipCode: '00000',
    coordinates: {
      lat: 0,
      lng: 0,
    },
  },
  features: {
    bedrooms: 3,
    bathrooms: 2,
    area: 100,
    garage: 1,
    yearBuilt: 2020,
  },
  amenities: ['pool', 'garden'],
  images: [
    '/assets/placeholders/casa-1.jpg',
    '/assets/placeholders/casa-2.jpg',
    '/assets/placeholders/casa-3.jpg',
  ],
  featured: true,
  agent: agentList[0],
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  listedDate: '2023-01-01T00:00:00Z',
};

const saleProperties: Property[] = Array.from({ length: 24 }, (_, i) => ({
  ...baseProperty,
  id: `${i + 1}`,
  title: `Propiedad Destacada ${i + 1}`,
}));

const rentProperties: Property[] = Array.from({ length: 24 }, (_, i) => ({
  ...baseProperty,
  id: `r-${i + 1}`,
  title: `Departamento en Arriendo ${i + 1}`,
  listingType: 'rent',
  price: 350 + i * 10,
  propertyType: 'apartment',
  features: {
    bedrooms: 2 + (i % 2),
    bathrooms: 1 + (i % 2),
    area: 60 + i * 4,
    garage: 0,
    yearBuilt: 2012 + (i % 8),
  },
  amenities: ['balcony', 'elevator', 'security'],
  images: ['/assets/placeholders/casa-1.jpg'],
  featured: i < 6,
  agent: agentList[0],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  listedDate: new Date().toISOString(),
}));

export const properties: Property[] = [...saleProperties, ...rentProperties];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};

export const filterProperties = (filters: Partial<PropertyFilters>): Property[] => {
  return properties.filter((property) => {
    if (
      filters.listingType &&
      filters.listingType !== 'all' &&
      property.listingType !== filters.listingType
    )
      return false;
    if (
      filters.propertyType &&
      filters.propertyType !== 'all' &&
      property.propertyType !== filters.propertyType
    )
      return false;
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (min !== null && property.price < min) return false;
      if (max !== null && property.price > max) return false;
    }
    if (
      filters.bedrooms !== null &&
      filters.bedrooms !== undefined &&
      property.features.bedrooms < filters.bedrooms
    )
      return false;
    if (
      filters.bathrooms !== null &&
      filters.bathrooms !== undefined &&
      property.features.bathrooms < filters.bathrooms
    )
      return false;
    if (
      filters.minArea !== null &&
      filters.minArea !== undefined &&
      property.features.area < filters.minArea
    )
      return false;
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((a) =>
        property.amenities.includes(a)
      );
      if (!hasAllAmenities) return false;
    }
    if (filters.location) {
      const location = filters.location.toLowerCase();
      const propertyLocation = (
        property.address.city +
        ' ' +
        property.address.state +
        ' ' +
        property.address.country +
        ' ' +
        property.address.zipCode
      ).toLowerCase();
      if (!propertyLocation.includes(location)) return false;
    }
    return true;
  });
};

export const getFeaturedProperties = (limit?: number): Property[] => {
  const featured = properties.filter((property) => property.featured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getPropertiesByAgent = (agentId: string): Property[] => {
  return properties.filter((property) => property.agent.id === agentId);
};
