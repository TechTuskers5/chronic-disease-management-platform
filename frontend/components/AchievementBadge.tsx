import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "@/context/ThemeContext"
import Animated, {
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated"
import { Ionicons } from "@expo/vector-icons"

interface AchievementBadgeProps {
  title: string
  icon: keyof typeof Ionicons.glyphMap
  progress: number
  index?: number
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ title, icon, progress, index = 0 }) => {
  const { colors } = useTheme()
  const scale = useSharedValue(0)

  React.useEffect(() => {
    scale.value = withDelay(
      index * 100,
      withSequence(withSpring(1.2, { damping: 12 }), withTiming(1, { duration: 300 })),
    )
  }, [index, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Ionicons name={icon} size={24} color="white" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.progress}>{`${Math.round(progress * 100)}%`}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
  },
  gradient: {
    padding: 2,
    borderRadius: 16,
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    alignItems: "center",
    borderRadius: 14,
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  progress: {
    color: "white",
    fontSize: 10,
    opacity: 0.8,
    marginTop: 4,
  },
})

export default AchievementBadge

