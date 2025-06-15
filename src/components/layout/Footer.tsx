import React from "react";
import { Link } from "react-router-dom";
import {
  House,
  EnvelopeSimple,
  Phone,
  MapPin,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* PropiedadesPlus (logo + texto + redes) */}
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center justify-center space-x-2 text-xl font-bold mb-4">
              <House weight="fill" size={24} />
              <span>PropiedadesPlus</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-[220px]">
              Encuentra tu propiedad ideal de forma simple y rápida. Explora nuestra selección de casas, departamentos y espacios comerciales.
            </p>
            <div className="flex space-x-4 justify-center">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookLogo size={24} weight="fill" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterLogo size={24} weight="fill" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramLogo size={24} weight="fill" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Todas las propiedades</Link></li>
              <li><Link to="/properties?listingType=sale" className="text-gray-400 hover:text-white transition-colors">En venta</Link></li>
              <li><Link to="/properties?listingType=rent" className="text-gray-400 hover:text-white transition-colors">En arriendo</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Tipos de propiedad */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tipos de Propiedad</h3>
            <ul className="space-y-2">
              <li><Link to="/properties?propertyType=apartment" className="text-gray-400 hover:text-white transition-colors">Departamentos</Link></li>
              <li><Link to="/properties?propertyType=house" className="text-gray-400 hover:text-white transition-colors">Casas</Link></li>
              <li><Link to="/properties?propertyType=villa" className="text-gray-400 hover:text-white transition-colors">Villas</Link></li>
              <li><Link to="/properties?propertyType=condo" className="text-gray-400 hover:text-white transition-colors">Condominios</Link></li>
              <li><Link to="/properties?propertyType=land" className="text-gray-400 hover:text-white transition-colors">Terrenos</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex justify-center items-center gap-2">
                <MapPin size={20} className="text-primary" />
                <span className="text-gray-400">123 Calle Inmobiliaria, Ciudad, País</span>
              </li>
              <li className="flex justify-center items-center gap-2">
                <Phone size={20} className="text-primary" />
                <a href="tel:+56912345678" className="text-gray-400 hover:text-white transition-colors">+56 9 1234 5678</a>
              </li>
              <li className="flex justify-center items-center gap-2">
                <EnvelopeSimple size={20} className="text-primary" />
                <a href="mailto:contacto@propiedadesplus.cl" className="text-gray-400 hover:text-white transition-colors">contacto@propiedadesplus.cl</a>
              </li>
            </ul>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookLogo size={24} weight="fill" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterLogo size={24} weight="fill" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramLogo size={24} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 text-center md:text-start">
          <p>© {new Date().getFullYear()} PropiedadesPlus. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-start gap-4">
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
