// src/components/ui/HeroSearch.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchFilters from './search-filters';

interface HeroSearchProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSearch: React.FC<HeroSearchProps> = ({
  backgroundImage = '/assets/hero-background.png',
  title = 'Encuentra la Propiedad Perfecta',
  subtitle = 'Busca entre miles de casas, departamentos y propiedades de lujo en todo el país',
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div
      className="relative min-h-[600px] flex flex-col items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`
      }}
    >
      <motion.div
        className="relative z-10 text-center text-white max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-8"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>

        {!showFilters && (
          <motion.button
            variants={itemVariants}
            className="px-6 py-3 text-lg font-semibold bg-white text-primary rounded-full shadow-md hover:bg-gray-100 transition"
            onClick={() => setShowFilters(true)}
          >
            Explorar propiedades
          </motion.button>
        )}
      </motion.div>

      {/* Filtros: se despliegan debajo con animación */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="absolute bottom-[-70px] w-full max-w-5xl mx-auto z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-4">
              <SearchFilters variant="hero" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSearch;
