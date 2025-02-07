import type React from "react"
import { useEffect, useRef } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue, withDelay } from "react-native-reanimated"
import { useTheme } from "../context/ThemeContext"

const NUM_PARTICLES = 20

const ParticleBackground: React.FC = () => {
  const { colors } = useTheme()
  const particles = Array(NUM_PARTICLES)
    .fill(0)
    .map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      initialX: Math.random() * Dimensions.get("window").width,
      initialY: Math.random() * Dimensions.get("window").height,
    }))

  return (
    <View style={StyleSheet.absoluteFill}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          size={particle.size}
          x={particle.initialX}
          y={particle.initialY}
          color={colors.primary}
        />
      ))}
    </View>
  )
}

interface ParticleProps {
  size: number
  x: number
  y: number
  color: string
}

const Particle: React.FC<ParticleProps> = ({ size, x, y, color }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(0.6, { duration: 1000 })
    translateY.value = withRepeat(withTiming(-100, { duration: 3000 + Math.random() * 2000 }), -1, true)
    translateX.value = withRepeat(
      withTiming(50 - Math.random() * 100, { duration: 4000 + Math.random() * 2000 }),
      -1,
      true,
    )
  }, [opacity, translateX, translateY]) // Added opacity to dependencies

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  )
}

export default ParticleBackground

