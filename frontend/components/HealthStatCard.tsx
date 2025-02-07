import type React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import GlassCard from "../components/GlassCard"
import ParticleBackground from "../components/ParticleBackground"
import ProgressRing from "../components/ProgressRing"

const HealthStatsScreen: React.FC = () => {
  const { colors } = useTheme()

  const healthStats = [
    {
      icon: "heart-outline",
      label: "Heart Rate",
      value: "72",
      unit: "bpm",
      progress: 0.72,
      gradient: [colors.accent1, `${colors.accent1}80`] as const,
      description: "Normal resting heart rate",
    },
    {
      icon: "fitness-outline",
      label: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      progress: 0.85,
      gradient: [colors.accent2, `${colors.accent2}80`] as const,
      description: "Optimal blood pressure range",
    },
    {
      icon: "water-outline",
      label: "Blood Sugar",
      value: "100",
      unit: "mg/dL",
      progress: 0.65,
      gradient: [colors.accent3, `${colors.accent3}80`] as const,
      description: "Fasting blood glucose level",
    },
    {
      icon: "thermometer-outline",
      label: "Temperature",
      value: "98.6",
      unit: "°F",
      progress: 0.92,
      gradient: [colors.accent4, `${colors.accent4}80`] as const,
      description: "Normal body temperature",
    },
  ]

  return (
    <View style={styles.container}>
      <ParticleBackground />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Health Stats</Text>
          <Text style={styles.headerSubtitle}>Your vital signs at a glance</Text>
        </View>

        <Animated.View
          entering={FadeInDown.delay(200)}
          style={[styles.content, { backgroundColor: `${colors.background}90` }]}
        >
          {healthStats.map((stat, index) => (
            <GlassCard key={index} style={styles.statCard} index={index}>
              <View style={styles.statHeader}>
                <LinearGradient
                  colors={stat.gradient}
                  style={styles.iconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={stat.icon as keyof typeof Ionicons.glyphMap} size={24} color="white" />
                </LinearGradient>
                <View style={styles.statHeaderText}>
                  <Text style={[styles.statLabel, { color: colors.text }]}>{stat.label}</Text>
                  <Text style={[styles.statDescription, { color: colors.textSecondary }]}>{stat.description}</Text>
                </View>
              </View>

              <View style={styles.statContent}>
                <ProgressRing size={100} progress={stat.progress} delay={index * 100} />
                <View style={styles.valueContainer}>
                  <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statUnit, { color: colors.textSecondary }]}>{stat.unit}</Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 8,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
    backdropFilter: "blur(10px)",
  },
  statCard: {
    marginBottom: 20,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  statHeaderText: {
    flex: 1,
  },
  statLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 14,
  },
  statContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  valueContainer: {
    alignItems: "flex-end",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  statUnit: {
    fontSize: 14,
    marginTop: 4,
  },
})

export default HealthStatsScreen

