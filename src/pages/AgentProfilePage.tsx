import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById, getPropertiesByAgent } from '../data/properties';
import { Property, Agent } from '../types';
import PropertyCard from '../components/ui/property-card';
import { Container } from '../components/ui/container';
import { Envelope, Phone } from '@phosphor-icons/react';

const AgentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [propertiesSale, setPropertiesSale] = useState<Property[]>([]);
  const [propertiesRent, setPropertiesRent] = useState<Property[]>([]);
  const saleGridRef = useRef<HTMLDivElement>(null);
  const rentGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const foundAgent = getAgentById(id);
      setAgent(foundAgent);

      const allProps = getPropertiesByAgent(id);
      const sale = allProps.filter(p => p.listingType === 'sale');
      const rent = allProps.filter(p => p.listingType === 'rent');

      const getVisibleItems = (ref: React.RefObject<HTMLDivElement>, list: Property[]) => {
        const grid = ref.current;
        if (!grid) return [];
        const computed = window.getComputedStyle(grid);
        const columnCount = computed.getPropertyValue('grid-template-columns').split(' ').length;
        return list.slice(0, columnCount); // una fila visible
      };

      const updateGrids = () => {
        setPropertiesSale(getVisibleItems(saleGridRef, sale));
        setPropertiesRent(getVisibleItems(rentGridRef, rent));
      };

      setTimeout(updateGrids, 50);
      window.addEventListener('resize', updateGrids);
      return () => window.removeEventListener('resize', updateGrids);
    }
  }, [id]);

  if (!agent) return <div className="p-10 text-center">Agente no encontrado.</div>;

  return (
    <Container className="py-12">
      {/* Perfil del Agente */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-28 h-28 rounded-full object-cover border border-border"
        />
        <div>
          <h1 className="text-3xl font-bold mb-1">{agent.name}</h1>
          <p className="text-muted-foreground mb-2">{agent.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Envelope size={32} /> {agent.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> {agent.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Propiedades en Venta */}
      <h2 className="text-2xl font-semibold mb-4">Propiedades en Venta</h2>
      <div
        ref={saleGridRef}
        className="grid gap-6 mb-12"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', display: 'grid' }}
      >
        {propertiesSale.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Propiedades en Arriendo */}
      <h2 className="text-2xl font-semibold mb-4">Propiedades en Arriendo</h2>
      <div
        ref={rentGridRef}
        className="grid gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', display: 'grid' }}
      >
        {propertiesRent.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </Container>
  );
};

export default AgentProfilePage;
