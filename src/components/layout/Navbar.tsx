import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  HouseSimple,
  List,
  X,
  MagnifyingGlass,
  User,
  UploadSimple
} from '@phosphor-icons/react';
import { Button } from '../ui/button';
import ModeToggle from '../ui/mode-toggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActiveTab = (key?: string) => {
    const params = new URLSearchParams(location.search);
    return params.get('listingType') === key;
  };

  const navItems = [
    { to: '/properties?listingType=sale', label: 'Comprar', key: 'sale', icon: <HouseSimple className="w-5 h-5" /> },
    { to: '/properties?listingType=sell', label: 'Vender', key: 'sell', icon: <List className="w-5 h-5" /> },
    { to: '/properties?listingType=rent', label: 'Arrendar', key: 'rent', icon: <MagnifyingGlass className="w-5 h-5" /> },
    { to: '/publish', label: 'Publicar', icon: <UploadSimple className="w-5 h-5" /> },
    { to: '/agents', label: 'Agentes', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4">
        <div className="container mx-auto flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="PropiedadesPlus Logo"
              className="h-6 w-auto"
            />
            <span className="font-bold text-xl hidden sm:inline">PropiedadesPlus</span>
          </Link>

          {/* Navegación centrada en desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-6 text-base font-medium">
              {navItems.map(({ to, label, key, icon }) =>
                key ? (
                  <NavLink
                    key={to}
                    to={to}
                    className={() =>
                      `capitalize flex items-center gap-2 relative px-2 pb-1 transition-colors hover:text-foreground/80 ${
                        isActiveTab(key)
                          ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary'
                          : 'text-foreground/60'
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                ) : (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `capitalize flex items-center gap-2 relative px-2 pb-1 transition-colors hover:text-foreground/80 ${
                        isActive
                          ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary'
                          : 'text-foreground/60'
                      }`
                    }
                  >
                    {icon}
                    {label}
                  </NavLink>
                )
              )}
            </nav>
          </div>

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
            {navItems.map(({ to, label, key, icon }) =>
              key ? (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={() =>
                    `capitalize flex items-center gap-3 py-2 text-base font-medium transition-colors hover:text-foreground/80 ${
                      isActiveTab(key) ? 'text-foreground' : 'text-foreground/60'
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `capitalize flex items-center gap-3 py-2 text-base font-medium transition-colors hover:text-foreground/80 ${
                      isActive ? 'text-foreground' : 'text-foreground/60'
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              )
            )}
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
