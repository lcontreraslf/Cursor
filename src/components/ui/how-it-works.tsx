// src/components/ui/how-it-works.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlass, House, Handshake, Star } from '@phosphor-icons/react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <MagnifyingGlass size={32} weight="fill" className="text-primary" />,
      title: 'Search Properties',
      description: 'Browse through our extensive catalog of properties. Use filters to find exactly what you\'re looking for.',
    },
    {
      icon: <House size={32} weight="fill" className="text-primary" />,
      title: 'View Details',
      description: 'Explore detailed property information, high-quality images, floor plans, and neighborhood insights.',
    },
    {
      icon: <Handshake size={32} weight="fill" className="text-primary" />,
      title: 'Contact Agent',
      description: 'Connect directly with our expert real estate agents to schedule viewings or ask questions.',
    },
    {
      icon: <Star size={32} weight="fill" className="text-primary" />,
      title: 'Make It Yours',
      description: 'Complete the purchase or rental process with our guidance for a smooth transition to your new home.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Finding and securing your dream property is a simple process with our platform. Follow these steps to get started.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              <div className="mt-4 text-lg font-bold text-primary">Step {index + 1}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;