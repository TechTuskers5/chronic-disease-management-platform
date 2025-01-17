import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface GradientBackgroundProps {
  children: ReactNode;
  style?: object;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
