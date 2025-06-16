import React from 'react';
import { motion } from 'framer-motion';
import SearchFilters from './search-filters';
import { useNavigate } from 'react-router-dom';

interface HeroSearchProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSearch: React.FC<HeroSearchProps> = ({
  backgroundImage = '/assets/hero-background.png',
  title = 'Find Your Dream Property',
  subtitle = 'Discover the perfect home that matches your lifestyle and preferences',
}) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Ya no necesita lógica específica, porque SearchFilters lo manejará con navigate internamente
    // Pero dejamos el onSearch por si se quiere extender más adelante
  };

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
      className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[680px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
      }}
    >
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants}>
          <SearchFilters variant="hero" onSearch={handleSearch} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSearch;