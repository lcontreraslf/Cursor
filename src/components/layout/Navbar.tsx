import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HouseSimple, List, X, MagnifyingGlass, User } from '@phosphor-icons/react';
import { Button } from '../ui/button';
import ModeToggle from '../ui/mode-toggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { to: '/properties?listingType=sale', label: 'Comprar' },
    { to: '/properties?listingType=sell', label: 'Vender' },
    { to: '/properties?listingType=rent', label: 'Arrendar' },
    { to: '/publish', label: 'Publicar' },
    { to: '/agents', label: 'Agentes' }, // 🔹 nuevo tab
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4">
        <div className="container mx-auto flex h-14 items-center justify-between">
          {/* Logo: imagen + texto */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="PropiedadesPlus Logo"
              className="h-6 w-auto"
            />
            <span className="font-bold text-xl hidden sm:inline">PropiedadesPlus</span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `transition-colors hover:text-foreground/80 ${
                    isActive ? 'text-foreground' : 'text-foreground/60'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Lado derecho */}
          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MagnifyingGlass className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <ModeToggle />
            <Button variant="default" className="ml-2 hidden md:flex">
              <User className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Button>
            {/* Hamburguesa mobile */}
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
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-background shadow-lg p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Menú</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-2 transition-colors hover:text-foreground/80 ${
                    isActive ? 'text-foreground' : 'text-foreground/60'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Button variant="default" className="mt-4 w-full">
              <User className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
