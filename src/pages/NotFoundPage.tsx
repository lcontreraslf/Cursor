import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { House, MagnifyingGlass } from '@phosphor-icons/react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-16">
        <motion.div 
          className="text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <House size={80} className="text-gray-400 mx-auto" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            We couldn't find the page you're looking for. The property might have been sold, or the link might be incorrect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="min-w-[160px]">
                Go Home
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline" className="min-w-[160px]">
                <MagnifyingGlass size={18} className="mr-2" />
                Browse Properties
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;