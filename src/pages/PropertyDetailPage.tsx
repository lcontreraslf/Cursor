import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/ui/container';
import { PropertyGallery } from '../components/ui/property-gallery';
import { PropertyFeatures } from '../components/ui/property-features';
import { PropertyDescription } from '../components/ui/property-description';
import { PropertyAmenities } from '../components/ui/property-amenities';
import { PropertyContact } from '../components/ui/property-contact';
import { PropertyLocation } from '../components/ui/property-location';
import { PropertyInfo } from '../components/ui/property-info';
import MapView from '../components/ui/map-view';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import { CaretLeft as ChevronLeft, Star } from '@phosphor-icons/react';
import { usePropertyStore } from '../store/propertyStore';
import { Property } from '../types';
import NotFoundPage from './NotFoundPage';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = usePropertyStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const foundProperty = getPropertyById(id);
      setProperty(foundProperty);
      setLoading(false);

      const timer = setTimeout(() => {
        setLoadingMap(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [id, getPropertyById]);

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <Container className="py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-[400px] w-full bg-gray-200 rounded"></div>
          <div className="h-40 w-full bg-gray-200 rounded"></div>
        </div>
      </Container>
    );
  }

  if (!property) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen">
      <div className="container px-6 xl:px-8 py-6 md:py-12 mx-auto">
        {/* Botón volver */}
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/properties">
              <ChevronLeft size={16} className="mr-1" />
              Back to Listings
            </Link>
          </Button>
        </div>

        {/* Encabezado de propiedad */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-lg text-muted-foreground">
              {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Button
              onClick={toggleSaved}
              variant={isSaved ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Star weight={isSaved ? 'fill' : 'regular'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
        </div>

        {/* Galería */}
        <PropertyGallery images={property.images} />

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-8 mt-10">
          <div className="space-y-10">
            <PropertyInfo property={property} />
            <Separator />
            <PropertyDescription description={property.description} />
            <Separator />
            <PropertyFeatures features={property.features} />
            <Separator />
            <PropertyAmenities amenities={property.amenities} />
            <Separator />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Location</h2>
              <div className="h-[400px] overflow-hidden rounded-lg border border-border">
                {loadingMap ? (
                  <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">Loading map...</div>
                  </div>
                ) : (
                  <MapView properties={[property]} selectedProperty={property} />
                )}
              </div>
              <PropertyLocation location={property.address} />
            </div>
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <PropertyContact property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
