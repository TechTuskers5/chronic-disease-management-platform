import React from "react"
import { StyleSheet, type ViewStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated"
import { useTheme } from "../context/ThemeContext"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import * as Haptics from "expo-haptics"

interface GlassCardProps {
  children: React.ReactNode
  style?: ViewStyle
  onPress?: () => void
  index?: number
  isVisible?: boolean
}

const GlassCard: React.FC<GlassCardProps> = ({ children, style, onPress, index = 0, isVisible = true }) => {
  const { colors, theme } = useTheme()
  const scale = useSharedValue(0.8)
  const rotate = useSharedValue(0)
  const opacity = useSharedValue(0)

  React.useEffect(() => {
    if (isVisible) {
      opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }))
      scale.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 }))
    }
  }, [isVisible, index]) // Added index to dependencies

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    rotate.value = withSequence(
      withTiming(-2, { duration: 50 }),
      withTiming(2, { duration: 100 }),
      withTiming(0, { duration: 50 }),
    )
    onPress?.()
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotateZ: `${rotate.value}deg` }],
  }))

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme === "light" ? `${colors.background}80` : `${colors.surface}80`,
            borderColor: `${colors.primary}20`,
          },
          style,
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    backdropFilter: "blur(10px)",
  },
})

export default GlassCard

