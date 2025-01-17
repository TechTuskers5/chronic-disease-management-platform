import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent1: string;
    accent2: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme: ThemeContextType = {
    colors: {
      primary: '#6C63FF',
      secondary: '#4CAF50',
      background: '#F0F4F8',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textSecondary: '#6B7280',
      accent1: '#FF6B6B',
      accent2: '#4ECDC4',
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

