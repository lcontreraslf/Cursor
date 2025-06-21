import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById, getPropertiesByAgent } from '../data/properties';
import { Property, Agent } from '../types';
import PropertyCard from '../components/ui/property-card';
import { Envelope, Phone } from '@phosphor-icons/react';

const AgentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (id) {
      const foundAgent = getAgentById(id) || null;
      setAgent(foundAgent);
      if (foundAgent) {
        const agentProperties = getPropertiesByAgent(foundAgent.id);
        setProperties(agentProperties);
      }
    }
  }, [id]);

  if (!agent) {
    return <div>Agente no encontrado</div>;
  }

  const propertiesSale = properties.filter(p => p.listingType === 'sale');
  const propertiesRent = properties.filter(p => p.listingType === 'rent');

  const Section = ({ title, properties }: { title: string; properties: Property[] }) => {
    if (properties.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        <div className="flex-shrink-0">
          <img src={agent.photo} alt={agent.name} className="w-24 h-24 rounded-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{agent.name}</h1>
          <p className="text-muted-foreground mt-2">{agent.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Envelope />
              <span>{agent.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone />
              <span>{agent.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <Section title="Propiedades en Venta" properties={propertiesSale} />
      <Section title="Propiedades en Arriendo" properties={propertiesRent} />
    </div>
  );
};

export default AgentProfilePage;
