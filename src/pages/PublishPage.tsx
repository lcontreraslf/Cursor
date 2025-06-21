import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  House, 
  MapPin, 
  Camera, 
  Bed, 
  Car, 
  Ruler, 
  CurrencyDollar,
  Check,
  ArrowLeft,
  ArrowRight,
  X,
  Upload,
  SwimmingPool,
  Tree,
  Sun,
  Flower,
  Barbell,
  Users,
  ShieldCheck,
  ArrowsVertical,
  Snowflake,
  Fire,
  CookingPot,
  WashingMachine,
  PawPrint
} from '@phosphor-icons/react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import LocationMap from '../components/ui/location-map';
import { cn } from "@/lib/utils";

interface FormData {
  title: string;
  description: string;
  listingType: 'sale' | 'rent' | '';
  propertyType: 'house' | 'apartment' | 'condo' | 'villa' | 'land' | 'townhouse' | '';
  price: string;
  currency: 'UF' | 'CLP';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    garage: number;
    yearBuilt?: number;
  };
  amenities: string[];
  images: File[];
  agentInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const PublishPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    listingType: '',
    propertyType: '',
    price: '',
    currency: 'UF',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Chile',
      zipCode: '',
      coordinates: { lat: -33.4489, lng: -70.6693 },
    },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      garage: 0,
    },
    amenities: [],
    images: [],
    agentInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const steps = [
    { id: 1, title: 'Información Básica', icon: House },
    { id: 2, title: 'Ubicación', icon: MapPin },
    { id: 3, title: 'Características', icon: Bed },
    { id: 4, title: 'Amenities', icon: Check },
    { id: 5, title: 'Imágenes', icon: Camera },
    { id: 6, title: 'Revisar', icon: CurrencyDollar },
  ];

  const amenitiesList = [
    { name: 'Piscina', icon: SwimmingPool },
    { name: 'Jardín', icon: Tree },
    { name: 'Terraza', icon: Sun },
    { name: 'Balcón', icon: Flower },
    { name: 'Gimnasio', icon: Barbell },
    { name: 'Sala de eventos', icon: Users },
    { name: 'Seguridad 24/7', icon: ShieldCheck },
    { name: 'Estacionamiento', icon: Car },
    { name: 'Ascensor', icon: ArrowsVertical },
    { name: 'Aire acondicionado', icon: Snowflake },
    { name: 'Calefacción', icon: Fire },
    { name: 'Cocina equipada', icon: CookingPot },
    { name: 'Lavandería', icon: WashingMachine },
    { name: 'Mascotas permitidas', icon: PawPrint },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('sale') ? 'sale' : params.get('rent') ? 'rent' : '';
    if (type) {
      setFormData(prev => ({ ...prev, listingType: type as 'sale' | 'rent' }));
    }
  }, [location.search]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleListingTypeChange = (value: 'sale' | 'rent') => {
    setFormData(prev => ({
      ...prev,
      listingType: value,
      currency: value === 'sale' ? 'UF' : prev.currency
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  const handleFeaturesChange = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      features: { ...prev.features, [field]: value }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const nextStep = () => currentStep < steps.length && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => navigate('/properties'), 2000);
    }, 2000);
  };

  const progress = (currentStep / steps.length) * 100;

  const getPageTitle = () => {
    if (formData.listingType === 'sale') return 'Publicar Propiedad en Venta';
    if (formData.listingType === 'rent') return 'Publicar Propiedad para Arrendar';
    return 'Publicar Propiedad';
  };

  const getPageSubtitle = () => {
    if (formData.listingType === 'sale') return 'Completa la información de tu propiedad para venderla.';
    if (formData.listingType === 'rent') return 'Completa la información de tu propiedad para arrendarla.';
    return 'Completa la información de tu propiedad para publicarla en nuestro portal.';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-4 block">
                Tipo de Publicación <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleListingTypeChange('sale')}
                  className={cn("p-6 rounded-lg border-2 transition-all duration-200",
                    formData.listingType === 'sale' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", formData.listingType === 'sale' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400')}>
                      <CurrencyDollar size={24} />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">Venta</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Vender tu propiedad</div>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleListingTypeChange('rent')}
                  className={cn("p-6 rounded-lg border-2 transition-all duration-200",
                    formData.listingType === 'rent' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", formData.listingType === 'rent' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400')}>
                      <House size={24} />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">Arrendar</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Ofrecer en arriendo</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4">
               <div>
                <Label htmlFor="title" className="text-sm font-medium">Título de la Publicación <span className="text-red-500">*</span></Label>
                <Input id="title" placeholder="Ej: Hermosa casa en Las Condes" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Descripción <span className="text-red-500">*</span></Label>
                <Textarea id="description" placeholder="Describe tu propiedad..." value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="mt-2 min-h-[120px]" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">Precio <span className="text-red-500">*</span></Label>
                <Input id="price" type="number" placeholder="150000000" value={formData.price || ''} onChange={(e) => handleInputChange('price', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="currency" className="text-sm font-medium">Moneda</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)} disabled={formData.listingType === 'sale'}>
                  <SelectTrigger className="w-full mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {formData.listingType === 'sale' ? 
                      <SelectItem value="UF">UF (Unidad de Fomento)</SelectItem> : 
                      <>
                        <SelectItem value="UF">UF (Unidad de Fomento)</SelectItem>
                        <SelectItem value="CLP">$ (Pesos Chilenos)</SelectItem>
                      </>
                    }
                  </SelectContent>
                </Select>
                {formData.listingType === 'sale' && <p className="text-xs text-gray-500 mt-1">Las propiedades en venta se cotizan en UF.</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="street">Calle y Número <span className="text-red-500">*</span></Label>
                <Input id="street" placeholder="Av. Las Condes 12345" value={formData.address.street} onChange={(e) => handleAddressChange('street', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="city">Ciudad <span className="text-red-500">*</span></Label>
                <Input id="city" placeholder="Santiago" value={formData.address.city} onChange={(e) => handleAddressChange('city', e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="state">Región / Estado</Label>
                <Input id="state" placeholder="RM" value={formData.address.state} onChange={(e) => handleAddressChange('state', e.target.value)} className="mt-2" />
              </div>
               <div>
                <Label htmlFor="zipCode">Código Postal</Label>
                <Input id="zipCode" placeholder="7550000" value={formData.address.zipCode} onChange={(e) => handleAddressChange('zipCode', e.target.value)} className="mt-2" />
              </div>
            </div>
            <LocationMap address={formData.address} coordinates={formData.address.coordinates} onCoordinatesChange={(coords) => setFormData(prev => ({...prev, address: {...prev.address, coordinates: coords}}))} onAddressChange={(completeAddress) => setFormData(prev => ({...prev, address: {...prev.address, ...completeAddress}}))} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Dormitorios</Label>
                <Input id="bedrooms" type="number" min="0" placeholder="3" value={formData.features.bedrooms || ''} onChange={(e) => handleFeaturesChange('bedrooms', parseInt(e.target.value) || 0)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="bathrooms">Baños</Label>
                <Input id="bathrooms" type="number" min="0" placeholder="2" value={formData.features.bathrooms || ''} onChange={(e) => handleFeaturesChange('bathrooms', parseInt(e.target.value) || 0)} className="mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="area">Área (m²) <span className="text-red-500">*</span></Label>
                <Input id="area" type="number" min="0" placeholder="120" value={formData.features.area || ''} onChange={(e) => handleFeaturesChange('area', parseInt(e.target.value) || 0)} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="garage">Estacionamientos</Label>
                <Input id="garage" type="number" min="0" placeholder="2" value={formData.features.garage || ''} onChange={(e) => handleFeaturesChange('garage', parseInt(e.target.value) || 0)} className="mt-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="yearBuilt">Año de Construcción</Label>
              <Input
                id="yearBuilt"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="2020"
                value={formData.features.yearBuilt || ''}
                onChange={(e) => handleFeaturesChange('yearBuilt', parseInt(e.target.value) || 0)}
                className="mt-2"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium mb-2 block">Amenities Disponibles</Label>
              <p className="text-sm text-gray-500 mb-6">Selecciona todas las comodidades que ofrece tu propiedad.</p>
              <div className="flex flex-wrap gap-3">
                {amenitiesList.map((amenity) => {
                  const Icon = amenity.icon;
                  const isSelected = formData.amenities.includes(amenity.name);
                  return (
                    <button key={amenity.name} type="button" onClick={() => toggleAmenity(amenity.name)}
                      className={cn("flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                        isSelected ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black shadow-md" : "border-gray-300 bg-transparent hover:border-gray-500 dark:border-gray-600"
                      )}
                    >
                      <Icon size={20} weight={isSelected ? 'fill' : 'regular'} />
                      <span>{amenity.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium">Subir Imágenes <span className="text-red-500">*</span></Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="mb-2">Arrastra y suelta las imágenes aquí</p>
              <Input type="file" multiple accept="image/*" onChange={handleImageUpload} id="image-upload" className="hidden" />
              <Button asChild variant="outline"><Label htmlFor="image-upload" className="cursor-pointer">Seleccionar Archivos</Label></Button>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                    <button onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"><X size={16} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 6:
        return <div>Revisar y Publicar</div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
          <p className="text-gray-600">{getPageSubtitle()}</p>
        </div>
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}><ArrowLeft size={16} className="mr-2" /> Anterior</Button>
                {currentStep < steps.length ?
                  <Button type="button" onClick={nextStep}>Siguiente <ArrowRight size={16} className="ml-2" /></Button> :
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Publicando...' : 'Publicar Propiedad'}</Button>
                }
              </div>
            </form>
          </CardContent>
        </Card>
        {submitStatus === 'success' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4 p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">¡Propiedad Publicada!</h3>
              <p className="text-gray-600 mb-4">Tu propiedad ha sido publicada y está pendiente de revisión.</p>
              <Button onClick={() => navigate('/properties')}>Ver Mis Propiedades</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishPage;
