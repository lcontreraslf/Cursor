// src/pages/HomePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroSearch from "../components/ui/hero-search";
import PropertyCard from "../components/ui/property-card";
import HowItWorks from "../components/ui/how-it-works";
import { Button } from "../components/ui/button";
import { getFeaturedProperties } from "../data/properties";
import { type Property } from "../types";
import { Buildings } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const all = getFeaturedProperties();

    const updateVisibleProperties = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setFeaturedProperties(all);
        return;
      }

      const grid = gridRef.current;
      if (!grid) return;

      const style = window.getComputedStyle(grid);
      const templateColumns = style.getPropertyValue("grid-template-columns");
      const columnCount = templateColumns.split(" ").length;

      const max = columnCount * 2;
      setFeaturedProperties(all.slice(0, max));
    };

    updateVisibleProperties();
    window.addEventListener("resize", updateVisibleProperties);

    return () => window.removeEventListener("resize", updateVisibleProperties);
  }, []);

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
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {featuredProperties.length > 0 ? (
                featuredProperties.map((property) => (
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
                  <Buildings
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <h3 className="text-xl font-medium">
                    No hay propiedades destacadas disponibles
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Vuelve más tarde para ver nuevos listados
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <Link to="/featured-properties">
                <Button size="lg" className="mx-auto">
                  Ver todas las propiedades destacadas
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para encontrar tu hogar ideal?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Comienza tu búsqueda hoy mismo y descubre la propiedad perfecta
              que se ajuste a tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties?listingType=sale">
                <Button variant="secondary" size="lg">
                  Explorar propiedades en venta
                </Button>
              </Link>
              <Link to="/properties?listingType=rent">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  Buscar propiedades en arriendo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
