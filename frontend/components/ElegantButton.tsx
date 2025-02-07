import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface ElegantButtonProps {
  title: string
  onPress: () => void
  color?: "primary" | "secondary"
  style?: ViewStyle
  textStyle?: TextStyle
}

const ElegantButton: React.FC<ElegantButtonProps> = ({ title, onPress, color = "primary", style, textStyle }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: colors[color] }, style]}>
      <Text style={[styles.buttonText, { color: colors.buttonText }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ElegantButton

