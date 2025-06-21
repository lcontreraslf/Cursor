// src/types/index.ts

// Tipos base para enumeraciones
export type ListingType = 'sale' | 'rent';
// Añadido 'townhouse' para que coincida con tus datos en properties.ts
export type PropertyType = 'house' | 'apartment' | 'condo' | 'villa' | 'land' | 'townhouse' | 'office'; 

// Interfaz para el agente
export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  description: string;
}

// Interfaz para las coordenadas de dirección
export interface Coordinates {
  lat: number;
  lng: number;
}

// Interfaz para la dirección de la propiedad
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates: Coordinates;
}

// Interfaz para las características de la propiedad
export interface Features {
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  garage: number; // number of cars
  yearBuilt?: number; // Hago 'yearBuilt' opcional
}

// Interfaz principal para la propiedad
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string; // USD, EUR, etc.
  listingType: ListingType;
  propertyType: PropertyType;
  address: Address;
  features: Features;
  amenities: string[]; // pool, garden, gym, etc.
  images: string[]; // URLs to images
  featured: boolean;
  agent: Agent;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  listedDate: string; // ¡¡Añadido este campo para resolver la advertencia de 'listedDate'!!
}

// Interfaz para los filtros de búsqueda de propiedades
export interface PropertyFilters {
  location: string | null;
  listingType: ListingType | 'all'; // Puede ser 'sale', 'rent' o 'all'
  propertyType: PropertyType | 'all'; // Puede ser un tipo específico o 'all'
  priceRange: {
    min: number | null;
    max: number | null;
  };
  bedrooms: number | null;
  bathrooms: number | null;
  minArea: number | null;
  amenities: string[];
}

// Interfaz para SearchParams (si la usas para tipar parámetros de URL, es buena práctica)
export interface SearchParams {
  location?: string;
  listingType?: ListingType | 'all';
  propertyType?: PropertyType | 'all';
  priceMin?: number;
  priceMax?: number;
  // Puedes añadir otros parámetros que uses en la URL aquí
}