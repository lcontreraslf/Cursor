// src/pages/AgentsPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { 
  Star, 
  MapPin, 
  HouseLine, 
  Phone, 
  Envelope, 
  Trophy, 
  Clock, 
  Users,
  MagnifyingGlass,
  Funnel
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

// Datos mejorados de agentes con imágenes y más detalles
const agents = [
  {
    id: "a1",
    name: "María González",
    title: "Especialista en Propiedades Premium",
    location: "Las Condes, Santiago",
    rating: 4.9,
    reviews: 127,
    properties: 23,
    experience: "8 años",
    specialties: ["Residencial", "Comercial", "Lujo"],
    phone: "+56 9 1234 5678",
    email: "maria.gonzalez@proplus.cl",
    photo: "/assets/placeholders/casa-1.jpg", // Usando placeholder temporal
    description: "Especialista en propiedades de alto valor con enfoque en atención personalizada y resultados excepcionales.",
    achievements: ["Top Seller 2023", "Certificación Premium"],
    languages: ["Español", "Inglés"],
    responseTime: "< 2 horas"
  },
  {
    id: "a2",
    name: "Carlos Muñoz",
    title: "Experto en Inversiones Inmobiliarias",
    location: "Providencia, Santiago",
    rating: 4.8,
    reviews: 89,
    properties: 18,
    experience: "12 años",
    specialties: ["Inversión", "Desarrollo", "Arriendo"],
    phone: "+56 9 2345 6789",
    email: "carlos.munoz@proplus.cl",
    photo: "/assets/placeholders/casa-2.jpg",
    description: "Asesor experto en inversiones inmobiliarias con amplia experiencia en desarrollo de proyectos y gestión de portafolios.",
    achievements: ["Mejor Asesor 2022", "Certificación Internacional"],
    languages: ["Español", "Inglés", "Portugués"],
    responseTime: "< 1 hora"
  },
  {
    id: "a3",
    name: "Ana Silva",
    title: "Especialista en Propiedades Familiares",
    location: "Ñuñoa, Santiago",
    rating: 4.7,
    reviews: 156,
    properties: 31,
    experience: "6 años",
    specialties: ["Familiar", "Primera Vivienda", "Barrios"],
    phone: "+56 9 3456 7890",
    email: "ana.silva@proplus.cl",
    photo: "/assets/placeholders/casa-3.jpg",
    description: "Dedicada a encontrar el hogar perfecto para familias, con especial atención a barrios residenciales y primera vivienda.",
    achievements: ["Especialista Familiar", "Certificación Residencial"],
    languages: ["Español"],
    responseTime: "< 3 horas"
  },
  {
    id: "a4",
    name: "Roberto Díaz",
    title: "Consultor en Propiedades Comerciales",
    location: "Santiago Centro",
    rating: 4.9,
    reviews: 203,
    properties: 42,
    experience: "15 años",
    specialties: ["Comercial", "Oficinas", "Retail"],
    phone: "+56 9 4567 8901",
    email: "roberto.diaz@proplus.cl",
    photo: "/assets/placeholders/casa-1.jpg",
    description: "Consultor senior especializado en propiedades comerciales, oficinas y espacios de retail con amplia red de contactos.",
    achievements: ["Consultor del Año 2023", "Certificación Comercial"],
    languages: ["Español", "Inglés", "Francés"],
    responseTime: "< 1 hora"
  },
  {
    id: "a5",
    name: "Carmen Vega",
    title: "Especialista en Propiedades de Lujo",
    location: "Vitacura, Santiago",
    rating: 4.8,
    reviews: 78,
    properties: 15,
    experience: "10 años",
    specialties: ["Lujo", "Premium", "Exclusivo"],
    phone: "+56 9 5678 9012",
    email: "carmen.vega@proplus.cl",
    photo: "/assets/placeholders/casa-2.jpg",
    description: "Especialista en propiedades de lujo y exclusivas, ofreciendo un servicio premium y discreto para clientes exigentes.",
    achievements: ["Luxury Specialist", "Certificación Premium"],
    languages: ["Español", "Inglés", "Italiano"],
    responseTime: "< 30 min"
  },
  {
    id: "a6",
    name: "Diego Morales",
    title: "Asesor en Propiedades Nuevas",
    location: "Maipú, Santiago",
    rating: 4.6,
    reviews: 134,
    properties: 28,
    experience: "7 años",
    specialties: ["Nuevas", "Proyectos", "Preventa"],
    phone: "+56 9 6789 0123",
    email: "diego.morales@proplus.cl",
    photo: "/assets/placeholders/casa-3.jpg",
    description: "Especialista en proyectos inmobiliarios nuevos y preventa, con amplio conocimiento del mercado de desarrollo.",
    achievements: ["Especialista en Nuevas", "Certificación Proyectos"],
    languages: ["Español", "Inglés"],
    responseTime: "< 2 horas"
  }
];

const AgentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const specialties = Array.from(new Set(agents.flatMap(agent => agent.specialties)));

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || agent.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container px-6 xl:px-8 mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Nuestros Expertos
              </h1>
            </motion.div>
          </div>

          {/* Filtros */}
          <div className="container px-6 xl:px-8 mx-auto">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, especialidad o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <Funnel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="">Todas las especialidades</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-16">
          <div className="container px-6 xl:px-8 mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  variants={cardVariants}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  {/* Imagen redonda del agente */}
                  <div className="relative pt-6 pb-4 flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={12} weight="fill" />
                        {agent.rating}
                      </div>
                    </div>
                    
                    {/* Nombre y título */}
                    <div className="text-center mt-4 px-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{agent.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{agent.title}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin size={14} />
                        <span>{agent.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contenedor de estadísticas */}
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-2 gap-3 text-center mb-4">
                      <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{agent.properties}</p>
                        <p className="text-xs text-muted-foreground">Propiedades</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{agent.experience}</p>
                        <p className="text-xs text-muted-foreground">Experiencia</p>
                      </div>
                    </div>

                    {/* Especialidades */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {agent.specialties.slice(0, 2).map(spec => (
                        <span key={spec} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md text-muted-foreground">{spec}</span>
                      ))}
                      {agent.specialties.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md text-muted-foreground">
                          +{agent.specialties.length - 2}
                        </span>
                      )}
                    </div>
                    
                    {/* Botón Ver Perfil */}
                    <Link to={`/agents/${agent.id}`} className="block">
                      <Button className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white">
                        Ver Perfil
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mensaje si no hay resultados */}
            {filteredAgents.length === 0 && (
              <div className="text-center py-16">
                <Users size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No se encontraron agentes</h3>
                <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentsPage;
