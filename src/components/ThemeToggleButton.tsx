import { ThemeContext } from '@/contexts/themeContext';
import { Moon, Sun } from 'lucide-react';
import React, { useContext } from 'react';

const ThemeToggleSwitch: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center justify-center  cursor-pointer transition-colors"
    >
      <span className="text-xl">
        {theme === 'dark' ? <Sun/> : <Moon/>}
      </span>
    </div>
  );
};

export default ThemeToggleSwitch;

