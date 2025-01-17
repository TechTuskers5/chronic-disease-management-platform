import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, useAnimatedReaction } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  index: number;
  isVisible: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, style, index, isVisible }) => {
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
    <Animated.View style={[styles.card, style, animatedStyle]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
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
  },
});

export default AnimatedCard;

