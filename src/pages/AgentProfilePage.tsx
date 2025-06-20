// src/pages/AgentProfilePage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById, getPropertiesByAgent } from '../data/properties';
import { Property } from '../types';
import PropertyCard from '../components/ui/property-card';
import { Button } from '../components/ui/button';
import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react';

const AgentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const agent = id ? getAgentById(id) : null;
  const properties = id ? getPropertiesByAgent(id) : [];

  const forSale = properties.filter((p) => p.listingType === 'sale');
  const forRent = properties.filter((p) => p.listingType === 'rent');

  if (!agent) {
    return (
      <div className="container px-6 xl:px-8 mx-auto py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Agente no encontrado</h2>
        <p className="text-muted-foreground">Verifica el enlace o selecciona otro agente.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="py-12 border-b">
          <div className="container px-6 xl:px-8 mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-3xl font-bold mb-1">{agent.name}</h1>
              <p className="text-muted-foreground mb-3 max-w-xl">
                {agent.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <EnvelopeSimple size={16} /> {agent.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={16} /> {agent.phone}
                </span>
                <span className="flex items-center gap-1">
                  <WhatsappLogo size={16} /> {agent.phone}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-6 xl:px-8 mx-auto">
            {forSale.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Propiedades en Venta</h2>
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
                  }}
                >
                  {forSale.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} compact />
                  ))}
                </div>
              </div>
            )}

            {forRent.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Propiedades en Arriendo</h2>
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
                  }}
                >
                  {forRent.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentProfilePage;