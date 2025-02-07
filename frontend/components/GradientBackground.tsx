import type React from "react"
import { StyleSheet, type ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"

interface GradientBackgroundProps {
  children: React.ReactNode
  style?: ViewStyle
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style }) => {
  const { colors } = useTheme()

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default GradientBackground


