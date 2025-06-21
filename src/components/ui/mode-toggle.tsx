// src/components/ui/mode-toggle.tsx
import React from 'react';
import { Button } from './button'; // Asumiendo que tu componente Button está en el mismo directorio ui
import { Sun, Moon } from '@phosphor-icons/react'; // Asegúrate de tener Phosphor Icons instalado
import { useTheme } from '../../hooks/use-theme';

const ModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

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
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ModeToggle;