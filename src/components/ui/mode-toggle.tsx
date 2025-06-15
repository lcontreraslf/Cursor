// src/components/ui/mode-toggle.tsx
import React, { useEffect, useState } from 'react';
import { Button } from './button'; // Asumiendo que tu componente Button está en el mismo directorio ui
import { Sun, Moon } from '@phosphor-icons/react'; // Asegúrate de tener Phosphor Icons instalado

const ModeToggle: React.FC = () => {
  // Estado para el tema actual ('light' o 'dark')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Inicializa el tema desde localStorage o por defecto a 'light'
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' ? 'dark' : 'light';
    }
    return 'light'; // Por defecto si no está en un entorno de navegador
  });

  // Efecto para aplicar la clase 'dark' al <html> y guardar la preferencia
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // Remueve ambas para evitar conflictos
    root.classList.add(theme); // Aplica la clase del tema actual
    localStorage.setItem('theme', theme); // Guarda la preferencia del usuario
  }, [theme]);

  // Función para alternar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ModeToggle;