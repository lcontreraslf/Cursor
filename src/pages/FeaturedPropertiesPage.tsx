// src/pages/FeaturedPropertiesPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "../types";
import { getFeaturedProperties } from "../data/properties";
import PropertyCard from "../components/ui/property-card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";

// Función para mezclar aleatoriamente
const shuffle = (arr: Property[]) => [...arr].sort(() => Math.random() - 0.5);

const FeaturedPropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const allFeatured: Property[] = shuffle(getFeaturedProperties()); // ← 🔁 ahora se mezclan

  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [visibleProperties, setVisibleProperties] = useState<Property[]>([]);
  const initialized = useRef(false);

  const noMoreToLoad = visibleCount >= allFeatured.length;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialized.current || !gridRef.current) return;

      const style = window.getComputedStyle(gridRef.current);
      const columns = style
        .getPropertyValue("grid-template-columns")
        .split(" ")
        .filter(Boolean).length;

      const initialCount = (columns || 5) * 2;

      setVisibleCount(initialCount);
      initialized.current = true;
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (visibleCount > 0) {
      setVisibleProperties(allFeatured.slice(0, visibleCount));
    }
  }, [visibleCount]);

  const handleLoadMore = () => {
    if (!gridRef.current) return;

    const style = window.getComputedStyle(gridRef.current);
    const columns = style
      .getPropertyValue("grid-template-columns")
      .split(" ")
      .filter(Boolean).length;

    const toAdd = (columns || 5) * 2;

    setVisibleCount((prev) => prev + toAdd);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-muted/50">
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-4xl font-bold mb-2">Propiedades Destacadas</h1>
                <p className="text-muted-foreground">
                  Estas son las propiedades destacadas seleccionadas por su valor, ubicación o demanda.
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={18} /> Volver atrás
              </Button>
            </div>

            <motion.div
              ref={gridRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
            >
              {visibleProperties.map((property) => (
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

            <div className="mt-10 text-center">
              <Button
                size="lg"
                onClick={handleLoadMore}
                disabled={noMoreToLoad}
                className={noMoreToLoad ? "opacity-60 cursor-not-allowed" : ""}
              >
                {noMoreToLoad
                  ? "No hay más propiedades por cargar"
                  : "Cargar más propiedades"}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeaturedPropertiesPage;
