// src/components/layout/Navbar.tsx

import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  HouseSimple,
  List,
  X,
  MagnifyingGlass,
  User,
  UploadSimple,
  Buildings,
  Users,
} from '@phosphor-icons/react';
import { Button } from '../ui/button';
import ModeToggle from '../ui/mode-toggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActivePath = (path: string) => location.pathname === path;
  const isActiveTab = (key?: string) => {
    const params = new URLSearchParams(location.search);
    return params.get('listingType') === key;
  };

  const navItems = [
    {
      to: '/properties?listingType=sale',
      label: 'Comprar',
      key: 'sale',
      icon: <Buildings className="w-5 h-5" />,
    },
    {
      to: '/properties?listingType=rent',
      label: 'Arrendar',
      key: 'rent',
      icon: <HouseSimple className="w-5 h-5" />,
    },
    {
      to: '/agents',
      label: 'Agentes',
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-6 xl:px-8">
        <div className="max-w-[1400px] mx-auto flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/logo-proplus.svg"
              alt="Logo ProPlus"
              className="h-16 md:h-20 w-auto"
            />
          </Link>

          {/* Navegación centrada en desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-8 text-base font-medium">
              {navItems.map(({ to, label, key, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={() => {
                    const isCurrentActive = (key && isActiveTab(key)) || isActivePath(to);
                    return `capitalize flex items-center gap-2 relative px-3 py-2 transition-all duration-200 hover:text-foreground/80 ${
                      isCurrentActive
                        ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-all after:duration-300'
                        : 'text-foreground/60 hover:text-foreground/80'
                    }`;
                  }}
                >
                  {icon}
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Lado derecho */}
          <div className="flex items-center space-x-3 ml-auto">
            <Button
              onClick={() => navigate('/publish')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hidden md:flex shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <UploadSimple className="w-5 h-5 mr-2" />
              Publicar
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MagnifyingGlass className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            <ModeToggle />

            <Button variant="outline" className="ml-2 hidden md:flex border-2 hover:bg-foreground hover:text-background transition-all duration-200">
              <User className="mr-2 h-4 w-4" />
              Acceder
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
            >
              <List className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <div className="absolute top-4 right-4 z-50 w-72 bg-white dark:bg-zinc-900 shadow-2xl rounded-xl p-6 flex flex-col gap-4 transition-transform duration-300">
            {/* Logo Mobile */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/logo-proplus.svg"
                alt="Logo ProPlus"
                className="h-14 w-auto"
              />
            </div>

            {/* Menú móvil */}
            {navItems.map(({ to, label, key, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={() => {
                  const isCurrentActive = (key && isActiveTab(key)) || isActivePath(to);
                  return `capitalize flex items-center gap-3 py-3 text-base font-medium transition-colors hover:text-foreground/80 rounded-lg px-3 ${
                    isCurrentActive ? 'text-foreground bg-foreground/5' : 'text-foreground/60'
                  }`;
                }}
              >
                {icon}
                {label}
              </NavLink>
            ))}

            <Button
              onClick={() => {
                closeMenu();
                navigate('/publish');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
            >
              <UploadSimple className="w-5 h-5 mr-2" />
              Publicar
            </Button>

            <Button variant="outline" className="mt-4 w-full border-2">
              <User className="mr-2 h-4 w-4" />
              Acceder
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
