import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowsClockwise } from '@phosphor-icons/react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface LocationMapProps {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  coordinates: { lat: number; lng: number };
  onCoordinatesChange?: (coords: { lat: number; lng: number }) => void;
  onAddressChange?: (address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  address, 
  coordinates, 
  onCoordinatesChange,
  onAddressChange
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Función para geocodificar la dirección
  const geocodeAddress = async () => {
    if (!address.street || !address.city) return;

    setIsLoading(true);
    setMapError(null);

    try {
      const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
      
      // Simular geocodificación (en producción usarías Google Maps API o similar)
      // Por ahora usamos coordenadas de ejemplo para Santiago
      const mockGeocode = {
        lat: -33.4489,
        lng: -70.6693
      };

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (onCoordinatesChange) {
        onCoordinatesChange(mockGeocode);
      }

      // Simular geocodificación inversa para rellenar campos automáticamente
      if (onAddressChange) {
        // En producción, esto vendría de la API de geocodificación inversa
        // Simulamos que la API nos devuelve la dirección completa y validada
        const completeAddress = {
          street: address.street || 'Av. Las Condes 12345',
          city: address.city || 'Santiago',
          state: address.state || 'RM',
          country: address.country || 'Chile',
          zipCode: address.zipCode || '8320000'
        };
        
        // Solo actualizar si hay cambios para evitar loops infinitos
        if (JSON.stringify(completeAddress) !== JSON.stringify(address)) {
          onAddressChange(completeAddress);
        }
      }
    } catch (error) {
      setMapError('No se pudo encontrar la ubicación. Verifica la dirección.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para geocodificación inversa (desde coordenadas)
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoading(true);
    setMapError(null);

    try {
      // Simular geocodificación inversa (en producción usarías Google Maps Geocoding API)
      // Por ahora usamos datos de ejemplo
      const mockAddress = {
        street: 'Av. Las Condes 12345',
        city: 'Santiago',
        state: 'RM',
        country: 'Chile',
        zipCode: '8320000'
      };

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800));

      if (onAddressChange) {
        onAddressChange(mockAddress);
      }
    } catch (error) {
      setMapError('No se pudo obtener la dirección desde las coordenadas.');
    } finally {
      setIsLoading(false);
    }
  };

  // Geocodificar automáticamente cuando cambia la dirección
  useEffect(() => {
    if (address.street && address.city) {
      geocodeAddress();
    }
  }, [address.street, address.city]);

  // Geocodificación inversa cuando se actualizan las coordenadas
  useEffect(() => {
    if (coordinates.lat && coordinates.lng && (!address.street || !address.city)) {
      reverseGeocode(coordinates.lat, coordinates.lng);
    }
  }, [coordinates.lat, coordinates.lng]);

  const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.country}`.trim();

  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              <h3 className="font-semibold">Ubicación en el Mapa</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={geocodeAddress}
              disabled={isLoading || !address.street || !address.city}
              className="flex items-center gap-2"
            >
              <ArrowsClockwise size={16} />
              {isLoading ? 'Buscando...' : 'Actualizar'}
            </Button>
          </div>
          {fullAddress && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {fullAddress}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Mapa Mock - En producción usarías Google Maps, Mapbox, etc. */}
          <div 
            ref={mapRef}
            className="h-64 bg-gray-100 dark:bg-gray-800 relative overflow-hidden"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Buscando ubicación...
                  </p>
                </div>
              </div>
            ) : mapError ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {mapError}
                  </p>
                </div>
              </div>
            ) : coordinates.lat && coordinates.lng ? (
              <>
                {/* Mock del mapa con imagen de fondo */}
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/assets/mock/map-mockup.jpg)',
                    backgroundSize: 'cover'
                  }}
                />
                
                {/* Pin de ubicación */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                  </div>
                </div>

                {/* Información de coordenadas */}
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-md">
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Lat: {coordinates.lat.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Lng: {coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ingresa una dirección para ver la ubicación en el mapa
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nota informativa */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-t">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            💡 <strong>Consejo:</strong> Una ubicación precisa en el mapa ayuda a los compradores a encontrar tu propiedad más fácilmente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap; 