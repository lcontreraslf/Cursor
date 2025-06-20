// src/pages/AgentsPage.tsx
import React from "react";
import { Link } from "react-router-dom"; // <-- Asegúrate de importar esto
import { Button } from "../components/ui/button";
import { Star, MapPin, HouseLine } from "@phosphor-icons/react";

const agents = [
  {
    id: "a1", // <-- asegúrate de que coincida con el ID del agente real en properties.ts
    name: "Carlos Muñoz",
    location: "Providencia, Santiago",
    rating: 4.8,
    properties: 12,
    photo: "/assets/agents/agent1.jpg",
  },
  {
    id: "a2",
    name: "María Fernández",
    location: "Viña del Mar",
    rating: 4.6,
    properties: 8,
    photo: "/assets/agents/agent2.jpg",
  },
  {
    id: "a3",
    name: "Joaquín Rivas",
    location: "Las Condes, Santiago",
    rating: 4.9,
    properties: 15,
    photo: "/assets/agents/agent3.jpg",
  },
];

const AgentsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="py-16 bg-muted/50">
          <div className="container px-6 xl:px-8 mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Encuentra a tu agente ideal</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conecta con agentes certificados que te ayudarán a encontrar o publicar la propiedad perfecta.
            </p>
          </div>

          <div className="container px-6 xl:px-8 mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin size={16} /> {agent.location}
                </p>
                <p className="flex items-center gap-1 text-sm text-yellow-500 mb-1">
                  <Star size={16} /> {agent.rating} / 5
                </p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <HouseLine size={16} /> {agent.properties} propiedades activas
                </p>

                {/* Enlace al perfil del agente */}
                <Link to={`/agents/${agent.id}`} className="w-full">
                  <Button size="sm" className="w-full">
                    Ver Perfil
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
