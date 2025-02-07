import React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"
import Animated, { useAnimatedProps, withTiming, useSharedValue, withDelay } from "react-native-reanimated"
import { useTheme } from "../context/ThemeContext"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface ProgressRingProps {
  size: number
  progress: number
  strokeWidth?: number
  delay?: number
}

const ProgressRing: React.FC<ProgressRingProps> = ({ size, progress, strokeWidth = 10, delay = 0 }) => {
  const { colors } = useTheme()
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progressValue = useSharedValue(0)

  React.useEffect(() => {
    progressValue.value = withDelay(delay, withTiming(progress, { duration: 1500 }))
  }, [progress, delay]) // Added delay to dependencies

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progressValue.value),
  }))

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`${colors.primary}20`}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
})

export default ProgressRing

