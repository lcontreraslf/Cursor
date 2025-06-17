import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const cards = [
    {
      title: 'Inmobiliaria X',
      description: 'Descubre el nuevo proyecto “Altos del Valle”: departamentos modernos desde UF 2.000.',
      image: '/assets/inmobiliaria.jpg',
      cta: 'Ver Proyecto',
    },
    {
      title: 'Mudanzas X',
      description: 'Mudanzas seguras y rápidas en todo Chile. 15% de descuento usando PropiedadesPlus.',
      image: '/assets/mudanza.jpg',
      cta: 'Cotiza tu mudanza',
    },
    {
      title: 'Crédito Hipotecario Banco X',
      description: 'Simula y compara créditos hipotecarios con tasa preferente exclusiva para usuarios.',
      image: '/assets/banco.jpg',
      cta: 'Simular crédito',
    },
    {
      title: 'Corredor Destacado',
      description: 'Carlos Muñoz, 12 años de experiencia, especialista en propiedades en Ñuñoa y Providencia.',
      image: '/assets/corredor.jpg',
      cta: 'Ver Perfil',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recomendados</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Servicios destacados para complementar tu experiencia en PropiedadesPlus.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{card.description}</p>
              <button className="mt-4 text-sm font-medium text-primary hover:underline">
                {card.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
