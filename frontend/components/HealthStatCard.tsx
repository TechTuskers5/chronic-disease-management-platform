import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

interface HealthStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const HealthStatCard: React.FC<HealthStatCardProps> = ({ icon, label, value, color }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.iconContainer}>
        <Svg height="60" width="60" viewBox="0 0 100 100">
          <Circle cx="50" cy="50" r="45" stroke={color} strokeWidth="10" fill="none" />
        </Svg>
        <View style={styles.icon}>{icon}</View>
      </View>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    aspectRatio: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HealthStatCard;

