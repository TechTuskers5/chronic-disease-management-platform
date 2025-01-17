import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedReaction } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  index?: number;
  isVisible?: boolean;
}

const Card: React.FC<CardProps> = ({ children, style, index = 0, isVisible = true }) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useAnimatedReaction(
    () => isVisible,
    (visible) => {
      if (visible) {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withTiming(0, { duration: 500 });
      }
    },
    [isVisible]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: colors.surface },
        style,
        animatedStyle,
        { animationDelay: `${index * 100}ms` },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Card;

