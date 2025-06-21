// src/data/properties.ts
import { type Property } from '../types';
import { type PropertyFilters, Agent } from '../types';

const agents: Agent[] = [
  {
    id: 'a1',
    name: 'Agente Prueba',
    phone: '+1-000-000-0000',
    email: 'agent@example.com',
    photo: '/assets/placeholders/casa-1.jpg',
    description: 'Especialista en propiedades residenciales y comerciales. Atención personalizada y experiencia en toda la Región Metropolitana.'
  },
];

export const properties: Property[] = [
  // Propiedades en Venta
  {
    id: 'p1',
    title: 'Propiedad Destacada 1',
    description: 'Descripción de la propiedad destacada 1.',
    price: 100000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'house',
    address: {
      street: '123 Calle Principal',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 100,
      garage: 1,
    },
    amenities: ['piscina', 'jardín'],
    images: ['/assets/placeholders/casa-1.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  {
    id: 'p2',
    title: 'Propiedad Destacada 2',
    description: 'Descripción de la propiedad destacada 2.',
    price: 100000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'house',
    address: {
      street: '456 Calle Secundaria',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 100,
      garage: 1,
    },
    amenities: ['piscina', 'jardín'],
    images: ['/assets/placeholders/casa-2.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  {
    id: 'p3',
    title: 'Propiedad Destacada 3',
    description: 'Descripción de la propiedad destacada 3.',
    price: 100000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'house',
    address: {
      street: '789 Calle Terciaria',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 100,
      garage: 1,
    },
    amenities: ['piscina', 'jardín'],
    images: ['/assets/placeholders/casa-3.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  {
    id: 'p4',
    title: 'Propiedad Destacada 4',
    description: 'Descripción de la propiedad destacada 4.',
    price: 100000,
    currency: 'USD',
    listingType: 'sale',
    propertyType: 'house',
    address: {
      street: '101 Calle Cuaternaria',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 100,
      garage: 1,
    },
    amenities: ['piscina', 'jardín'],
    images: ['/assets/placeholders/casa-1.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  // Propiedades en Arriendo
  {
    id: 'p6',
    title: 'Departamento en Arriendo 1',
    description: 'Descripción del departamento en arriendo 1.',
    price: 350,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'apartment',
    address: {
      street: '123 Calle Arriendo',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 60,
      garage: 1,
    },
    amenities: ['balcón', 'gimnasio'],
    images: ['/assets/placeholders/casa-3.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  {
    id: 'p7',
    title: 'Departamento en Arriendo 2',
    description: 'Descripción del departamento en arriendo 2.',
    price: 360,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'apartment',
    address: {
      street: '456 Calle Arriendo',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 64,
      garage: 1,
    },
    amenities: ['balcón', 'gimnasio'],
    images: ['/assets/placeholders/casa-1.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  {
    id: 'p8',
    title: 'Departamento en Arriendo 3',
    description: 'Descripción del departamento en arriendo 3.',
    price: 370,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'apartment',
    address: {
      street: '789 Calle Arriendo',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 68,
      garage: 1,
    },
    amenities: ['balcón', 'gimnasio'],
    images: ['/assets/placeholders/casa-2.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  {
    id: 'p9',
    title: 'Departamento en Arriendo 4',
    description: 'Descripción del departamento en arriendo 4.',
    price: 380,
    currency: 'USD',
    listingType: 'rent',
    propertyType: 'apartment',
    address: {
      street: '101 Calle Arriendo',
      city: 'Santiago',
      state: 'RM',
      country: 'Chile',
      zipCode: '12345',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 72,
      garage: 1,
    },
    amenities: ['balcón', 'gimnasio'],
    images: ['/assets/placeholders/casa-3.jpg'],
    featured: true,
    agent: agents[0],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    listedDate: '2023-10-01',
  },
  // Propiedades adicionales para llegar a 24
  { id: 'p11', title: 'Casa Moderna en Vitacura', price: 320000, currency: 'USD', listingType: 'sale', propertyType: 'house', featured: true, agent: agents[0], images:['/assets/placeholders/casa-1.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 4, bathrooms: 3, area: 220, garage: 2 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p12', title: 'Loft Industrial en Lastarria', price: 180000, currency: 'USD', listingType: 'sale', propertyType: 'apartment', featured: true, agent: agents[0], images:['/assets/placeholders/casa-2.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 1, bathrooms: 1, area: 80, garage: 1 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p13', title: 'Parcela con Piscina en Chicureo', price: 450000, currency: 'USD', listingType: 'sale', propertyType: 'land', featured: true, agent: agents[0], images:['/assets/placeholders/casa-3.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 5, bathrooms: 4, area: 5000, garage: 3 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p14', title: 'Departamento con Vista al Mar', price: 280000, currency: 'USD', listingType: 'sale', propertyType: 'apartment', featured: true, agent: agents[0], images:['/assets/placeholders/casa-1.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 3, bathrooms: 2, area: 130, garage: 1 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p15', title: 'Casa de Campo en el Maule', price: 150000, currency: 'USD', listingType: 'sale', propertyType: 'house', featured: true, agent: agents[0], images:['/assets/placeholders/casa-2.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 3, bathrooms: 1, area: 180, garage: 2 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p16', title: 'Arriendo Pieza Estudiante', price: 250, currency: 'USD', listingType: 'rent', propertyType: 'apartment', featured: true, agent: agents[0], images:['/assets/placeholders/casa-3.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 1, bathrooms: 1, area: 25, garage: 0 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p17', title: 'Oficina en Providencia', price: 900, currency: 'USD', listingType: 'rent', propertyType: 'condo', featured: true, agent: agents[0], images:['/assets/placeholders/casa-1.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 0, bathrooms: 1, area: 50, garage: 1 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p18', title: 'Arriendo Casa Verano en La Serena', price: 1200, currency: 'USD', listingType: 'rent', propertyType: 'house', featured: true, agent: agents[0], images:['/assets/placeholders/casa-2.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 4, bathrooms: 3, area: 160, garage: 2 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p19', title: 'Penthouse de Lujo', price: 550000, currency: 'USD', listingType: 'sale', propertyType: 'apartment', featured: true, agent: agents[0], images:['/assets/placeholders/casa-3.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 3, bathrooms: 4, area: 250, garage: 3 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p20', title: 'Cabaña en Pucón', price: 850, currency: 'USD', listingType: 'rent', propertyType: 'house', featured: true, agent: agents[0], images:['/assets/placeholders/casa-1.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 2, bathrooms: 1, area: 70, garage: 1 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p21', title: 'Local Comercial en Ñuñoa', price: 1500, currency: 'USD', listingType: 'rent', propertyType: 'condo', featured: true, agent: agents[0], images:['/assets/placeholders/casa-2.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 0, bathrooms: 2, area: 100, garage: 0 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p22', title: 'Terreno en Venta en Colina', price: 95000, currency: 'USD', listingType: 'sale', propertyType: 'land', featured: true, agent: agents[0], images:['/assets/placeholders/casa-3.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 0, bathrooms: 0, area: 2500, garage: 0 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p23', title: 'Bodega Industrial', price: 2500, currency: 'USD', listingType: 'rent', propertyType: 'condo', featured: true, agent: agents[0], images:['/assets/placeholders/casa-1.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 0, bathrooms: 1, area: 300, garage: 5 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
  { id: 'p24', title: 'Casa en Condominio', price: 290000, currency: 'USD', listingType: 'sale', propertyType: 'house', featured: true, agent: agents[0], images:['/assets/placeholders/casa-2.jpg'], address: { street: '1', city: 's', state: 's', country: 's', zipCode: 's', coordinates: { lat: 1, lng: 1 } }, features: { bedrooms: 3, bathrooms: 3, area: 140, garage: 2 }, amenities: [], createdAt: '', updatedAt: '', listedDate: '' },
];

export const getAgentById = (agentId: string): Agent | undefined => {
  return agents.find((agent) => agent.id === agentId);
};

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};

export const filterProperties = (filters: Partial<PropertyFilters>): Property[] => {
  return properties.filter((property) => {
    // Aquí puedes añadir la lógica de filtrado si la necesitas
    return true;
  });
};

export const getFeaturedProperties = (): Property[] => {
  const featured = properties.filter((property) => property.featured);
  return featured;
};

export const getPropertiesByAgent = (agentId: string): Property[] => {
  return properties.filter((property) => property.agent.id === agentId);
};
