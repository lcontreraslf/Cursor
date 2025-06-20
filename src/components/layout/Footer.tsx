// src/components/layout/Footer.tsx
import React from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-16">
      <div className="container px-6 xl:px-8 mx-auto grid gap-8 md:grid-cols-4 text-sm">
        {/* Columna 1 */}
        <div>
          <h3 className="text-white font-semibold mb-3">PropiedadesPlus</h3>
          <p className="mb-2">Encuentra tu propiedad ideal de forma simple y rápida.</p>
          <p className="mb-4">Explora nuestra selección de casas, departamentos y espacios comerciales.</p>
          <div className="flex space-x-4 text-white mt-2">
            <FacebookLogo size={20} className="hover:text-gray-300 cursor-pointer" />
            <TwitterLogo size={20} className="hover:text-gray-300 cursor-pointer" />
            <InstagramLogo size={20} className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        {/* Columna 2 */}
        <div>
          <h4 className="text-white font-semibold mb-3">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Inicio</li>
            <li>Todas las propiedades</li>
            <li>En venta</li>
            <li>En arriendo</li>
            <li>Nosotros</li>
            <li>Contacto</li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h4 className="text-white font-semibold mb-3">Tipos de Propiedad</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Departamentos</li>
            <li>Casas</li>
            <li>Villas</li>
            <li>Condominios</li>
            <li>Terrenos</li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contacto</h4>
          <p className="text-gray-300">123 Calle Inmobiliaria, Ciudad, País</p>
          <p className="text-gray-300">+56 9 1234 5678</p>
          <p className="text-gray-300">contacto@propiedadesplus.cl</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-400">
        <p>© 2025 PropiedadesPlus. Todos los derechos reservados.</p>
        <p className="mt-2">
          <a href="#" className="hover:underline">Política de Privacidad</a> ·{" "}
          <a href="#" className="hover:underline">Términos de Servicio</a> ·{" "}
          <a href="#" className="hover:underline">Política de Cookies</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
