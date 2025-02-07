import type React from "react"
import { StyleSheet, type ViewStyle } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useTheme } from "@/context/ThemeContext"

interface AnimatedCardProps {
  children: React.ReactNode
  style?: ViewStyle
  index?: number
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, style, index = 0 }) => {
  const { colors } = useTheme()

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }, style]}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
})

export default AnimatedCard

