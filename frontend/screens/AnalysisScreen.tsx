import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { LineChart, ProgressChart } from "react-native-chart-kit"
import Animated, { FadeInDown } from "react-native-reanimated"
import GradientBackground from "@/components/GradientBackground"
import Card from "@/components/Card"
import ElegantButton from "@/components/ElegantButton"

const { width } = Dimensions.get("window")

const AnalysisScreen: React.FC = () => {
  const { colors } = useTheme()
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("week")

  const healthData = {
    week: {
      bloodPressure: [120, 118, 122, 119, 121, 117, 120],
      heartRate: [72, 75, 70, 73, 71, 74, 72],
      bloodSugar: [100, 105, 98, 102, 99, 101, 100],
    },
    month: {
      bloodPressure: [120, 119, 121, 118],
      heartRate: [72, 73, 71, 74],
      bloodSugar: [100, 102, 99, 101],
    },
    year: {
      bloodPressure: [120, 118, 122, 119, 121, 117, 120, 119, 120, 118, 121, 120],
      heartRate: [72, 75, 70, 73, 71, 74, 72, 73, 72, 71, 74, 72],
      bloodSugar: [100, 105, 98, 102, 99, 101, 100, 103, 101, 99, 102, 100],
    },
  }

  const progressData = {
    labels: ["Steps", "Calories", "Water"], // optional
    data: [0.8, 0.6, 0.7],
  }

  const renderMetricCard = (title: string, value: string, icon: keyof typeof Ionicons.glyphMap, color: string) => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.metricCardContainer}>
      <Card style={[styles.metricCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View>
          <Text style={[styles.metricTitle, { color: colors.textSecondary }]}>{title}</Text>
          <Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text>
        </View>
      </Card>
    </Animated.View>
  )

  return (
    <GradientBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Health Analysis</Text>
        </View>
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <Animated.View entering={FadeInDown.delay(100)} style={styles.periodSelector}>
            {["week", "month", "year"].map((period) => (
              <ElegantButton
                key={period}
                title={period.charAt(0).toUpperCase() + period.slice(1)}
                onPress={() => setSelectedPeriod(period as "week" | "month" | "year")}
                color={selectedPeriod === period ? "primary" : "secondary"}
                style={styles.periodButton}
              />
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300)} style={styles.chartContainer}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>Blood Pressure Trend</Text>
            <LineChart
              data={{
                labels: ["", "", "", "", "", ""],
                datasets: [{ data: healthData[selectedPeriod].bloodPressure }],
              }}
              width={width - 40}
              height={220}
              chartConfig={{
                backgroundColor: colors.background,
                backgroundGradientFrom: colors.background,
                backgroundGradientTo: colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => colors.primary,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Animated.View>

          <View style={styles.metricsContainer}>
            {renderMetricCard("Blood Pressure", "120/80 mmHg", "fitness-outline", colors.primary)}
            {renderMetricCard("Heart Rate", "72 bpm", "heart-outline", colors.accent1)}
            {renderMetricCard("Blood Sugar", "100 mg/dL", "water-outline", colors.accent2)}
          </View>

          <Animated.View entering={FadeInDown.delay(500)} style={styles.progressContainer}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>Daily Goals Progress</Text>
            <ProgressChart
              data={progressData}
              width={width - 40}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: colors.background,
                backgroundGradientFrom: colors.background,
                backgroundGradientTo: colors.background,
                decimalPlaces: 2,
                color: (opacity = 1) => colors.primary,
                style: {
                  borderRadius: 16,
                },
              }}
              hideLegend={false}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600)} style={styles.summaryContainer}>
            <Card style={styles.summaryCard}>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>Summary</Text>
              <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
                Your overall health indicators are within normal ranges. Keep up with your current lifestyle and
                medication routine. Consider increasing your daily step count to reach your fitness goals.
              </Text>
            </Card>
          </Animated.View>

          <ElegantButton
            title="Download Full Report"
            onPress={() => {
              /* Handle download */
            }}
            color="primary"
            style={styles.downloadButton}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  metricCardContainer: {
    width: "48%",
    marginBottom: 15,
  },
  metricCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  metricTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryCard: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
  },
  downloadButton: {
    marginTop: 10,
  },
})

export default AnalysisScreen

