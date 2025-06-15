// src/data/properties.ts
import { type Property } from '../types';
import { type PropertyFilters } from '../types'; 

// Local placeholder image paths
const placeholderImages = {
  singleTestImage: '/assets/placeholders/casa-1.jpg', // Imagen de prueba
  
  // Mantén tus rutas originales aquí, si las quieres para un futuro
  modernApartment: [
    '/assets/placeholders/modern-apartment-1.jpg',
    '/assets/placeholders/modern-apartment-2.jpg',
    '/assets/placeholders/modern-apartment-3.jpg',
  ],
  luxuryVilla: [
    '/assets/placeholders/luxury-villa-1.jpg',
    '/assets/placeholders/luxury-villa-2.jpg',
    '/assets/placeholders/luxury-villa-3.jpg',
    '/assets/placeholders/luxury-villa-4.jpg',
  ],
  downtownLoft: [
    '/assets/placeholders/downtown-loft-1.jpg',
    '/assets/placeholders/downtown-loft-2.jpg',
  ],
  familyHome: [
    '/assets/placeholders/family-home-1.jpg',
    '/assets/placeholders/family-home-2.jpg',
    '/assets/placeholders/family-home-3.jpg',
  ],
  penthouse: [
    '/assets/placeholders/penthouse-1.jpg',
    '/assets/placeholders/penthouse-2.jpg',
    '/assets/placeholders/penthouse-3.jpg',
  ],
  waterfrontCondo: [
    '/assets/placeholders/waterfront-condo-1.jpg',
    '/assets/placeholders/waterfront-condo-2.jpg',
  ],
  charmingCottage: [
    '/assets/placeholders/charming-cottage-1.jpg',
    '/assets/placeholders/charming-cottage-2.jpg',
    '/assets/placeholders/charming-cottage-3.jpg',
  ],
  modernTownhouse: [
    '/assets/placeholders/modern-townhouse-1.jpg',
    '/assets/placeholders/modern-townhouse-2.jpg',
  ],
  agents: {
    maria: '/assets/placeholders/agent-maria.jpg',
    john: '/assets/placeholders/agent-john.jpg',
    sarah: '/assets/placeholders/agent-sarah.jpg',
    david: '/assets/placeholders/agent-david.jpg',
    lisa: '/assets/placeholders/agent-lisa.jpg',
  },
};

// Mock data for properties
export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    description: 'Beautiful modern apartment with stunning ocean views, located in the heart of the city. This recently renovated property features high-end finishes, open floor plan, and large windows that allow natural light throughout the day.',
    price: 450000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'apartment',
    address: {
      street: '123 Ocean Avenue',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33139',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      garage: 1,
      yearBuilt: 2018,
    },
    amenities: ['pool', 'gym', 'security', 'elevator', 'parking'],
    images: [placeholderImages.singleTestImage],
    featured: true, // ¡Ya es true!
    agent: {
      id: 'a1',
      name: 'Maria Rodriguez',
      email: 'maria@realestate.com',
      phone: '+1-305-555-1234',
      photo: placeholderImages.agents.maria,
    },
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2023-06-15T10:00:00Z',
    listedDate: '2023-06-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Luxury Villa with Private Pool',
    description: 'Exquisite luxury villa in an exclusive gated community. Features include a private pool, spacious garden, gourmet kitchen, and premium finishes throughout. Perfect for families looking for comfort and privacy.',
    price: 1200000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'villa',
    address: {
      street: '45 Palm Boulevard',
      city: 'Beverly Hills',
      state: 'CA',
      country: 'USA',
      zipCode: '90210',
      coordinates: {
        lat: 34.0736,
        lng: -118.4004,
      },
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      area: 380,
      garage: 2,
      yearBuilt: 2015,
    },
    amenities: ['pool', 'garden', 'security', 'smart home', 'fireplace', 'bbq area'],
    images: [placeholderImages.singleTestImage],
    featured: true, // ¡Ya es true!
    agent: {
      id: 'a2',
      name: 'John Smith',
      email: 'john@realestate.com',
      phone: '+1-310-555-6789',
      photo: placeholderImages.agents.john,
    },
    createdAt: '2023-05-22T15:30:00Z',
    updatedAt: '2023-05-25T09:15:00Z',
    listedDate: '2023-05-22T15:30:00Z',
  },
  {
    id: '3',
    title: 'Downtown Loft with Industrial Design',
    description: 'Trendy industrial loft in the heart of downtown. High ceilings, exposed brick walls, and large factory windows. Recently renovated with modern appliances while preserving original character.',
    price: 2500,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'apartment',
    address: {
      street: '78 Urban Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10013',
      coordinates: {
        lat: 40.7197,
        lng: -74.0023,
      },
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 95,
      garage: 0,
      yearBuilt: 1920,
    },
    amenities: ['elevator', 'laundry', 'rooftop', 'bike storage'],
    images: [placeholderImages.singleTestImage],
    featured: false, // Esta no la tocaremos, seguirá siendo false
    agent: {
      id: 'a3',
      name: 'Sarah Johnson',
      email: 'sarah@realestate.com',
      phone: '+1-212-555-4321',
      photo: placeholderImages.agents.sarah,
    },
    createdAt: '2023-07-01T08:45:00Z',
    updatedAt: '2023-07-01T08:45:00Z',
    listedDate: '2023-07-01T08:45:00Z',
  },
  {
    id: '4',
    title: 'Cozy Family Home with Garden',
    description: 'Warm and welcoming family home in a quiet suburban neighborhood. Features a beautiful garden, updated kitchen, comfortable living areas, and spacious bedrooms. Close to schools and parks.',
    price: 650000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'house',
    address: {
      street: '456 Maple Street',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      zipCode: '98115',
      coordinates: {
        lat: 47.6815,
        lng: -122.3256,
      },
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      garage: 1,
      yearBuilt: 2005,
    },
    amenities: ['garden', 'patio', 'fireplace', 'basement', 'central heating'],
    images: [placeholderImages.singleTestImage],
    featured: true, // ¡Ya es true!
    agent: {
      id: 'a4',
      name: 'David Brown',
      email: 'david@realestate.com',
      phone: '+1-206-555-8765',
      photo: placeholderImages.agents.david,
    },
    createdAt: '2023-06-10T13:20:00Z',
    updatedAt: '2023-06-12T10:15:00Z',
    listedDate: '2023-06-10T13:20:00Z',
  },
  {
    id: '5',
    title: 'Penthouse with City Skyline Views',
    description: 'Luxurious penthouse with panoramic views of the city skyline. Features include floor-to-ceiling windows, premium appliances, marble countertops, and private terrace. Building amenities include concierge service and fitness center.',
    price: 8000,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'apartment',
    address: {
      street: '100 Skyline Avenue',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601',
      coordinates: {
        lat: 41.8848,
        lng: -87.6231,
      },
    },
    features: {
      bedrooms: 3,
      bathrooms: 3.5,
      area: 275,
      garage: 2,
      yearBuilt: 2019,
    },
    amenities: ['concierge', 'gym', 'terrace', 'smart home', 'wine cellar', 'jacuzzi'],
    images: [placeholderImages.singleTestImage],
    featured: true, // ¡Ya es true!
    agent: {
      id: 'a2',
      name: 'John Smith',
      email: 'john@realestate.com',
      phone: '+1-310-555-6789',
      photo: placeholderImages.agents.john,
    },
    createdAt: '2023-07-05T16:40:00Z',
    updatedAt: '2023-07-05T16:40:00Z',
    listedDate: '2023-07-05T16:40:00Z',
  },
  {
    id: '6',
    title: 'Waterfront Condo with Marina Access',
    description: 'Beautiful waterfront condo with direct access to the marina. Open concept living with upgraded kitchen, spacious master suite, and large balcony. Resort-style amenities in the building.',
    price: 520000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'condo',
    address: {
      street: '78 Harbor Drive',
      city: 'San Diego',
      state: 'CA',
      country: 'USA',
      zipCode: '92101',
      coordinates: {
        lat: 32.7206,
        lng: -117.1734,
      },
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 135,
      garage: 1,
      yearBuilt: 2012,
    },
    amenities: ['pool', 'marina access', 'clubhouse', 'gym', 'sauna', 'security'],
    images: [placeholderImages.singleTestImage],
    featured: true, // <-- ¡CAMBIADO A TRUE!
    agent: {
      id: 'a5',
      name: 'Lisa Wilson',
      email: 'lisa@realestate.com',
      phone: '+1-619-555-3456',
      photo: placeholderImages.agents.lisa,
    },
    createdAt: '2023-06-28T11:30:00Z',
    updatedAt: '2023-06-28T11:30:00Z',
    listedDate: '2023-06-28T11:30:00Z',
  },
  {
    id: '7',
    title: 'Charming Cottage with Mountain Views',
    description: 'Picturesque cottage nestled in the mountains with stunning views. Features include a stone fireplace, hardwood floors, updated kitchen, and expansive deck. Perfect for nature lovers and those seeking tranquility.',
    price: 375000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'house',
    address: {
      street: '25 Pine Ridge Road',
      city: 'Aspen',
      state: 'CO',
      country: 'USA',
      zipCode: '81611',
      coordinates: {
        lat: 39.1938,
        lng: -106.8214,
      },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      garage: 1,
      yearBuilt: 1985,
    },
    amenities: ['fireplace', 'deck', 'mountain view', 'hiking trails', 'wood stove'],
    images: [placeholderImages.singleTestImage],
    featured: true, // <-- ¡CAMBIADO A TRUE!
    agent: {
      id: 'a4',
      name: 'David Brown',
      email: 'david@realestate.com',
      phone: '+1-206-555-8765',
      photo: placeholderImages.agents.david,
    },
    createdAt: '2023-07-10T09:15:00Z',
    updatedAt: '2023-07-10T09:15:00Z',
    listedDate: '2023-07-10T09:15:00Z',
  },
  {
    id: '8',
    title: 'Modern Townhouse Near City Center',
    description: 'Contemporary townhouse within walking distance to restaurants, shops, and entertainment. Features include an open floor plan, high-end finishes, private courtyard, and rooftop terrace with city views.',
    price: 3200,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'townhouse',
    address: {
      street: '42 Urban Lane',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      zipCode: '78701',
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2.5,
      area: 185,
      garage: 1,
      yearBuilt: 2021,
    },
    amenities: ['courtyard', 'rooftop terrace', 'smart home', 'energy efficient', 'washer/dryer'],
    images: [placeholderImages.singleTestImage],
    featured: false, // Esta propiedad sigue siendo featured: false
    agent: {
      id: 'a3',
      name: 'Sarah Johnson',
      email: 'sarah@realestate.com',
      phone: '+1-212-555-4321',
      photo: placeholderImages.agents.sarah,
    },
    createdAt: '2023-07-03T14:20:00Z',
    updatedAt: '2023-07-03T14:20:00Z',
    listedDate: '2023-07-03T14:20:00Z',
  },
];

// Helper function to get property by ID
export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};

// Helper function to filter properties based on criteria
export const filterProperties = (filters: Partial<PropertyFilters>): Property[] => {
  return properties.filter(property => {
    if (filters.listingType && filters.listingType !== 'all' && property.listingType !== filters.listingType) {
      return false;
    }
    if (filters.propertyType && filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
      return false;
    }
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (min !== null && property.price < min) return false;
      if (max !== null && property.price > max) return false;
    }
    if (filters.bedrooms !== null && filters.bedrooms !== undefined && property.features.bedrooms < filters.bedrooms) {
      return false;
    }
    if (filters.bathrooms !== null && filters.bathrooms !== undefined && property.features.bathrooms < filters.bathrooms) {
      return false;
    }
    if (filters.minArea !== null && filters.minArea !== undefined && property.features.area < filters.minArea) {
      return false;
    }
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity: string) => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }
    if (filters.location) {
      const location = filters.location.toLowerCase();
      const propertyLocation = (
        property.address.city + ' ' + 
        property.address.state + ' ' + 
        property.address.country + ' ' + 
        property.address.zipCode
      ).toLowerCase();
      if (!propertyLocation.includes(location)) {
        return false;
      }
    }
    return true;
  });
};

// Get featured properties
export const getFeaturedProperties = (limit = 4): Property[] => {
  return properties
    .filter(property => property.featured)
    .slice(0, limit);
};