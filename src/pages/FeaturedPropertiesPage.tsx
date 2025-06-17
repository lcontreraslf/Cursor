// src/pages/FeaturedPropertiesPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "../types";
import { getFeaturedProperties } from "../data/properties";
import PropertyCard from "../components/ui/property-card";
import { Button } from "../components/ui/button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";

const FeaturedPropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProperties: Property[] = getFeaturedProperties();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-muted/50">
        <section className="py-16">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-4xl font-bold mb-2">Propiedades Destacadas</h1>
                <p className="text-muted-foreground">
                  Estas son las propiedades destacadas seleccionadas por su valor, ubicación o demanda.
                </p>
              </div>
              <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft size={18} /> Volver atrás
              </Button>
            </div>

            {featuredProperties.length === 0 ? (
              <p className="text-center text-gray-500">No se encontraron propiedades destacadas.</p>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
              >
                {featuredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturedPropertiesPage;