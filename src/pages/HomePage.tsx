// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSearch from '../components/ui/hero-search';
import PropertyCard from '../components/ui/property-card';
import HowItWorks from '../components/ui/how-it-works';
import { Button } from '../components/ui/button';
import { getFeaturedProperties } from '../data/properties'; // Asegúrate de que esta importación sea correcta
import { type Property } from '../types';
import { Buildings, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Get featured properties from data
    const properties = getFeaturedProperties(6); // <-- ¡CAMBIO AQUÍ! De 4 a 6
    setFeaturedProperties(properties);
  }, []); // El array de dependencias vacío significa que se ejecuta una sola vez al montar

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with Search */}
        <HeroSearch
          // backgroundImage="https://placehold.co/1920x1080/png?text=Real+Estate+Hero+Background" // Esta línea se eliminó en interacciones anteriores si usas la imagen local
          title="Find Your Perfect Property"
          subtitle="Search from thousands of homes, apartments, and luxury properties across the country"
        />

        {/* Featured Properties Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  Discover our handpicked selection of properties that stand out for their quality, location, and value.
                </p>
              </div>
              <Link to="/properties" className="mt-4 md:mt-0">
                <Button variant="outline" className="flex items-center gap-2">
                  View All <ArrowRight size={18} />
                </Button>
              </Link>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {featuredProperties.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}

              {featuredProperties.length === 0 && (
                <div className="col-span-3 py-20 text-center">
                  <Buildings size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium">No featured properties available</h3>
                  <p className="text-gray-500 mt-2">Check back later for new listings</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Call to Action Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Start your search today and discover the perfect property that meets all your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties?listingType=sale">
                <Button variant="secondary" size="lg">Browse Properties for Sale</Button>
              </Link>
              <Link to="/properties?listingType=rent">
                <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  Find Rentals
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;