// src/store/PropertyStore.ts
import { create } from 'zustand';
import {
  type PropertyFilters,
  type ListingType,
  type PropertyType,
  type Property
} from '../types';
import { filterProperties } from '../data/properties'; // Importar desde el archivo real

export const PROPERTIES_PER_PAGE = 12;

interface PropertyStore {
  filters: PropertyFilters;
  searchQuery: string;
  viewMode: 'grid' | 'list';
  isFilterDrawerOpen: boolean;
  properties: Property[];
  totalProperties: number;
  currentPage: number;
  setPage: (page: number) => void;
  fetchProperties: () => void;
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

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  filters: initialFilters,
  searchQuery: '',
  viewMode: 'grid',
  isFilterDrawerOpen: false,
  properties: [],
  totalProperties: 0,
  currentPage: 1,

  setPage: (page) => {
    set({ currentPage: page });
    get().fetchProperties();
  },

  fetchProperties: () => {
    const { filters } = get();
    const filtered = filterProperties(filters);
    set({
      properties: filtered,
      totalProperties: filtered.length,
    });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1,
    }));
    get().fetchProperties();
  },

  resetFilters: () => {
    set({ filters: initialFilters, currentPage: 1 });
    get().fetchProperties();
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleFilterDrawer: (open) =>
    set((state) => ({
      isFilterDrawerOpen: open !== undefined ? open : !state.isFilterDrawerOpen,
    })),
}));

// Conversion helpers
export const convertSearchParamsToFilters = (searchParams: URLSearchParams): Partial<PropertyFilters> => {
  const filters: Partial<PropertyFilters> = {};
  const listingType = searchParams.get('listingType');
  if (listingType) filters.listingType = listingType as ListingType | 'all';
  const propertyType = searchParams.get('propertyType');
  if (propertyType) filters.propertyType = propertyType as PropertyType | 'all';
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  if (priceMin || priceMax) {
    filters.priceRange = {
      min: priceMin ? Number(priceMin) : null,
      max: priceMax ? Number(priceMax) : null,
    };
  }
  const bedrooms = searchParams.get('bedrooms');
  if (bedrooms) filters.bedrooms = Number(bedrooms);
  const bathrooms = searchParams.get('bathrooms');
  if (bathrooms) filters.bathrooms = Number(bathrooms);
  const minArea = searchParams.get('minArea');
  if (minArea) filters.minArea = Number(minArea);
  const amenities = searchParams.get('amenities');
  if (amenities) filters.amenities = amenities.split(',');
  const location = searchParams.get('location');
  if (location) filters.location = location;
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
