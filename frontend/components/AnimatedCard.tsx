import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedReaction } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  index: number;
  isVisible: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, style, index, isVisible }) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.95);

  useAnimatedReaction(
    () => isVisible,
    (visible) => {
      if (visible) {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withTiming(0, { duration: 500 });
        scale.value = withTiming(1, { duration: 500 });
      }
    },
    [isVisible]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View style={[styles.card, style, animatedStyle, { animationDelay: `${index * 100}ms` }]}>
      <LinearGradient
        colors={colors.cardGradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default AnimatedCard;
