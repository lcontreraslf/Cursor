// src/store/propertyStore.ts
import { create } from 'zustand';
import { type PropertyFilters, type ListingType, type PropertyType, type Property } from '../types';
// Importa las propiedades completas y la función de filtro desde data/properties
import { properties as allPropertiesData, filterProperties } from '../data/properties';

// Define el número de propiedades por página
export const PROPERTIES_PER_PAGE = 12; // <-- ¡La palabra 'export' está aquí!

interface PropertyStore {
  // Estado existente
  filters: PropertyFilters;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  isFilterDrawerOpen: boolean;

  // NUEVO ESTADO para las propiedades y paginación
  properties: Property[]; // Propiedades que se mostrarán después de filtrar y paginar
  totalProperties: number; // Total de propiedades que coinciden con los filtros
  currentPage: number; // Página actual

  // NUEVAS ACCIONES
  setPage: (page: number) => void; // Para cambiar la página
  fetchProperties: () => void; // Acción para cargar y filtrar las propiedades
  
  // Acciones existentes
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleFilterDrawer: (open?: boolean) => void;
}

const initialFilters: PropertyFilters = {
  listingType: 'all',
  propertyType: 'all',
  priceRange: {
    min: null,
    max: null,
  },
  bedrooms: null,
  bathrooms: null,
  minArea: null,
  amenities: [],
  location: null,
};

export const usePropertyStore = create<PropertyStore>((set, get) => ({ // Añadimos 'get' para acceder al estado actual
  // Inicialización del estado
  filters: initialFilters,
  searchQuery: '',
  viewMode: 'grid',
  isFilterDrawerOpen: false,

  properties: [], // Inicialmente vacío
  totalProperties: 0, // Inicialmente 0
  currentPage: 1, // Página inicial

  // Implementación de la acción setPage
  setPage: (page) => {
    set({ currentPage: page });
    get().fetchProperties(); // Vuelve a obtener las propiedades cuando cambia la página
  },

  // Implementación de la acción fetchProperties
  fetchProperties: () => {
    const state = get(); // Obtiene el estado actual del store
    
    // 1. Aplicar filtros a todas las propiedades
    const filtered = filterProperties(state.filters);

    // 2. Calcular el total de propiedades filtradas
    const total = filtered.length;

    // 3. Aplicar paginación
    const startIndex = (state.currentPage - 1) * PROPERTIES_PER_PAGE;
    const endIndex = startIndex + PROPERTIES_PER_PAGE;
    const paginated = filtered.slice(startIndex, endIndex);

    // 4. Actualizar el estado del store
    set({ 
      properties: paginated, 
      totalProperties: total 
    });
  },

  // Implementación de las acciones existentes
  setFilters: (newFilters) => {
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Resetear la página a 1 cuando los filtros cambian
    }));
    get().fetchProperties(); // Vuelve a obtener las propiedades con los nuevos filtros
  },
  
  resetFilters: () => {
    set({ filters: initialFilters, currentPage: 1 }); // Resetear filtros y página
    get().fetchProperties(); // Vuelve a obtener las propiedades después de resetear
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }), // Esta acción no afecta directamente la lista de propiedades mostrada en este store, pero puede ser útil para un componente Search
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  toggleFilterDrawer: (open) => 
    set((state) => ({ 
      isFilterDrawerOpen: open !== undefined ? open : !state.isFilterDrawerOpen 
    })),
}));

// Las funciones helper (convertSearchParamsToFilters, convertFiltersToSearchParams) se mantienen igual
export const convertSearchParamsToFilters = (searchParams: URLSearchParams): Partial<PropertyFilters> => {
  const filters: Partial<PropertyFilters> = {};
  
  const listingType = searchParams.get('listingType');
  if (listingType) {
    filters.listingType = listingType as ListingType | 'all';
  }
  
  const propertyType = searchParams.get('propertyType');
  if (propertyType) {
    filters.propertyType = propertyType as PropertyType | 'all';
  }
  
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  if (priceMin || priceMax) {
    filters.priceRange = {
      min: priceMin ? Number(priceMin) : null,
      max: priceMax ? Number(priceMax) : null,
    };
  }
  
  const bedrooms = searchParams.get('bedrooms');
  if (bedrooms) {
    filters.bedrooms = Number(bedrooms);
  }
  
  const bathrooms = searchParams.get('bathrooms');
  if (bathrooms) {
    filters.bathrooms = Number(bathrooms);
  }
  
  const minArea = searchParams.get('minArea');
  if (minArea) {
    filters.minArea = Number(minArea);
  }
  
  const amenities = searchParams.get('amenities');
  if (amenities) {
    filters.amenities = amenities.split(',');
  }
  
  const location = searchParams.get('location');
  if (location) {
    filters.location = location;
  }
  
  return filters;
};

export const convertFiltersToSearchParams = (filters: Partial<PropertyFilters>): URLSearchParams => {
  const searchParams = new URLSearchParams();
  
  if (filters.listingType && filters.listingType !== 'all') {
    searchParams.set('listingType', filters.listingType);
  }
  
  if (filters.propertyType && filters.propertyType !== 'all') {
    searchParams.set('propertyType', filters.propertyType);
  }
  
  if (filters.priceRange?.min) {
    searchParams.set('priceMin', filters.priceRange.min.toString());
  }
  
  if (filters.priceRange?.max) {
    searchParams.set('priceMax', filters.priceRange.max.toString());
  }
  
  if (filters.bedrooms) {
    searchParams.set('bedrooms', filters.bedrooms.toString());
  }
  
  if (filters.bathrooms) {
    searchParams.set('bathrooms', filters.bathrooms.toString());
  }
  
  if (filters.minArea) {
    searchParams.set('minArea', filters.minArea.toString());
  }
  
  if (filters.amenities && filters.amenities.length > 0) {
    searchParams.set('amenities', filters.amenities.join(','));
  }
  
  if (filters.location) {
    searchParams.set('location', filters.location);
  }
  
  return searchParams;
};