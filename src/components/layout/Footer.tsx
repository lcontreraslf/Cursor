import React from 'react';
import { Link } from 'react-router-dom';
import { House, EnvelopeSimple, Phone, MapPin, FacebookLogo, TwitterLogo, InstagramLogo } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold mb-4">
              <House weight="fill" size={24} />
              <span>RealEstate</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Finding your dream property has never been easier. Browse our exclusive listings for homes, apartments, and commercial spaces.
            </p>
            <div className="flex space-x-4">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">All Properties</Link>
              </li>
              <li>
                <Link to="/properties?listingType=sale" className="text-gray-400 hover:text-white transition-colors">Properties for Sale</Link>
              </li>
              <li>
                <Link to="/properties?listingType=rent" className="text-gray-400 hover:text-white transition-colors">Properties for Rent</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?propertyType=apartment" className="text-gray-400 hover:text-white transition-colors">Apartments</Link>
              </li>
              <li>
                <Link to="/properties?propertyType=house" className="text-gray-400 hover:text-white transition-colors">Houses</Link>
              </li>
              <li>
                <Link to="/properties?propertyType=villa" className="text-gray-400 hover:text-white transition-colors">Villas</Link>
              </li>
              <li>
                <Link to="/properties?propertyType=condo" className="text-gray-400 hover:text-white transition-colors">Condos</Link>
              </li>
              <li>
                <Link to="/properties?propertyType=land" className="text-gray-400 hover:text-white transition-colors">Land</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin size={20} className="text-primary" />
                <span className="text-gray-400">123 Real Estate Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <a href="tel:+123456789" className="text-gray-400 hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeSimple size={20} className="text-primary" />
                <a href="mailto:contact@realestate.com" className="text-gray-400 hover:text-white transition-colors">contact@realestate.com</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} RealEstate. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;