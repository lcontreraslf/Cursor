import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Button } from '../components/ui/button';

const PublishPage: React.FC = () => {
  const location = useLocation();
  const [listingType, setListingType] = useState<'sale' | 'rent' | ''>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('sale') ? 'sale' : params.get('rent') ? 'rent' : '';
    if (type) setListingType(type as 'sale' | 'rent');
  }, [location.search]);

  const title =
    listingType === 'sale'
      ? 'Publicar Venta'
      : listingType === 'rent'
      ? 'Publicar Arriendo'
      : 'Publicar Propiedad';

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 xl:px-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="mb-6">
        <Label className="mb-2 block">¿Qué quieres hacer?</Label>
        <Select value={listingType} onValueChange={(val) => setListingType(val as 'sale' | 'rent')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sale">Vender</SelectItem>
            <SelectItem value="rent">Arrendar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campos comunes */}
      <div className="mb-4">
        <Label htmlFor="title">Título</Label>
        <Input id="title" placeholder="Casa en Las Condes con jardín" />
      </div>
      <div className="mb-4">
        <Label htmlFor="price">Precio</Label>
        <Input id="price" placeholder="Ej: 150000000" type="number" />
      </div>

      {/* Campos condicionales */}
      {listingType === 'rent' && (
        <div className="mb-4">
          <Label htmlFor="duration">Duración del arriendo (meses)</Label>
          <Input id="duration" placeholder="Ej: 12" type="number" />
        </div>
      )}

      {listingType === 'sale' && (
        <div className="mb-4">
          <Label htmlFor="commission">Comisión del agente (%)</Label>
          <Input id="commission" placeholder="Ej: 2" type="number" />
        </div>
      )}

      <Button className="mt-6">Publicar Propiedad</Button>
    </div>
  );
};

export default PublishPage;
