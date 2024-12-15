import React, { createContext, useState, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightColors: ThemeColors = {
  background: '#F0F4F8',
  surface: '#FFFFFF',
  primary: '#1A73E8',
  primaryLight: '#E8F0FE',
  secondary: '#34A853',
  accent: '#FBBC04',
  text: '#202124',
  textSecondary: '#5F6368',
  border: '#DADCE0',
  error: '#EA4335',
  success: '#34A853',
  warning: '#FBBC04',
};

const darkColors: ThemeColors = {
  background: '#202124',
  surface: '#303134',
  primary: '#8AB4F8',
  primaryLight: '#3C4043',
  secondary: '#81C995',
  accent: '#FDD663',
  text: '#E8EAED',
  textSecondary: '#9AA0A6',
  border: '#5F6368',
  error: '#F28B82',
  success: '#81C995',
  warning: '#FDD663',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

