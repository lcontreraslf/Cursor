// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSearch from "../components/ui/hero-search";
import PropertyCard from "../components/ui/property-card";
import HowItWorks from "../components/ui/how-it-works";
import { Button } from "../components/ui/button";
import { getFeaturedProperties } from "../data/properties";
import { type Property } from "../types";
import { Buildings } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

// Función para desordenar el array
const shuffle = (array: Property[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => {
    const allFeatured = getFeaturedProperties();
    setFeaturedProperties(shuffle(allFeatured)); // Aplicamos el shuffle
  }, []);

  // Tomamos solo las primeras 8 para mostrar
  const propertiesToShow = featuredProperties.slice(0, 8);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSearch
          title="Encuentra la Propiedad Perfecta"
          subtitle="Busca entre miles de casas, departamentos y propiedades de lujo en todo el país"
        />

        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Propiedades Destacadas
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  Descubre nuestra selección destacada de propiedades que se
                  destacan por su calidad, ubicación y valor.
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {propertiesToShow.length > 0 ? (
                propertiesToShow.map((property) => (
                  <motion.div
                    key={property.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <Buildings size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium">
                    No hay propiedades destacadas disponibles
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Vuelve más tarde para ver nuevos listados
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/featured-properties">
                <Button size="lg">Ver Todas las Propiedades Destacadas</Button>
              </Link>
            </div>

          </div>
        </section>

        <HowItWorks />
      </main>
    </div>
  );
};

export default HomePage;
