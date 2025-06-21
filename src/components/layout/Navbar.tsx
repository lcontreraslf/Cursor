// src/components/layout/Navbar.tsx

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  List,
  X,
  User,
  UploadSimple,
} from '@phosphor-icons/react';
import { Button } from '../ui/button';
import ModeToggle from '../ui/mode-toggle';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const onHomePage = location.pathname === '/';

  useEffect(() => {
    if (!onHomePage) {
      setScrolled(true);
      return;
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll(); // Check scroll position on mount and on route change
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onHomePage]);

  const isTransparent = onHomePage && !scrolled;

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
    },
    {
      to: '/properties?listingType=rent',
      label: 'Arrendar',
      key: 'rent',
    },
    {
      to: '/agents',
      label: 'Agentes',
    },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isTransparent
        ? "bg-transparent border-none"
        : "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="w-full px-6 xl:px-8">
        <div className="max-w-[1400px] mx-auto flex h-20 items-center justify-between">
          {/* Lado izquierdo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/logo-proplus-v3.svg"
                alt="Logo ProPlus"
                className="h-10 w-auto"
              />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
              {navItems.map(({ to, label, key }) => {
                const isCurrentActive = (key && isActiveTab(key)) || isActivePath(to);
                return (
                  <NavLink
                    key={to}
                    to={to}
                    className={cn(
                      "relative px-1 py-2 transition-colors duration-200",
                      isTransparent
                        ? "text-white hover:text-white/80"
                        : "text-foreground/60 hover:text-foreground/80",
                      isCurrentActive && "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
                      isCurrentActive && (isTransparent ? "text-white after:bg-white" : "text-foreground after:bg-primary")
                    )}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Lado derecho */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/publish')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hidden md:flex shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <UploadSimple className="w-5 h-5 mr-2" />
              Publicar
            </Button>

            <div className={cn(isTransparent ? "[&>button]:text-white" : "")}>
              <ModeToggle />
            </div>

            <Button 
              variant="outline" 
              className={cn(
                "hidden md:flex border-2 hover:bg-foreground hover:text-background transition-all duration-200",
                isTransparent && "border-white text-white hover:bg-white hover:text-black"
              )}
            >
              <User className="mr-2 h-4 w-4" />
              Acceder
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={cn("md:hidden", isTransparent && "text-white hover:bg-white/10")}
            >
              <List className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMenu}>
          <div className="absolute top-4 right-4 z-50 w-72 bg-white dark:bg-zinc-900 shadow-2xl rounded-xl p-6 flex flex-col gap-4 transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <img
                src="/assets/logo-proplus-v3.svg"
                alt="Logo ProPlus"
                className="h-10 w-auto"
              />
               <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>

            {navItems.map(({ to, label, key }) => (
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
