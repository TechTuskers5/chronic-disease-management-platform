import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

type GradientTuple = readonly [string, string];

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
  success: string;
  error: string;
  cardGradient: GradientTuple;
  buttonGradient: GradientTuple;
}

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  background: '#F8F9FB',
  surface: '#FFFFFF',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  accent1: '#FF6B6B',
  accent2: '#FFA36B',
  accent3: '#FFC86B',
  accent4: '#6BFFD3',
  success: '#4CAF50',
  error: '#F44336',
  cardGradient: ['#FFFFFF', '#F0F0F0'] as const,
  buttonGradient: ['#4A90E2', '#50E3C2'] as const,
};

const darkColors: ThemeColors = {
  primary: '#6A9FE6',
  secondary: '#60E8CB',
  background: '#1A1A1A',
  surface: '#2C2C2C',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  accent1: '#FF8080',
  accent2: '#FFB280',
  accent3: '#FFD480',
  accent4: '#80FFE0',
  success: '#66BB6A',
  error: '#E57373',
  cardGradient: ['#2C2C2C', '#222222'] as const,
  buttonGradient: ['#6A9FE6', '#60E8CB'] as const,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme || 'light');

  useEffect(() => {
    setTheme(colorScheme || 'light');
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
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

