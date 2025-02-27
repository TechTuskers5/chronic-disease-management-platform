import type React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useTheme } from "@/context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import GradientBackground from "@/components/GradientBackground"
import AnimatedCard from "@/components/AnimatedCard"
import ElegantButton from "@/components/ElegantButton"

const PrescriptionScreen: React.FC = () => {
  const { colors } = useTheme()

  const prescriptions = [
    { id: 1, name: "Metformin", dosage: "500mg", frequency: "Twice daily", time: "9:00 AM, 9:00 PM" },
    { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", time: "8:00 AM" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", time: "10:00 PM" },
  ]

  const handleFindPharmacy = () => {
    // Implement find pharmacy logic
    console.log("Finding nearby pharmacies...")
  }

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Prescriptions</Text>
        </View>
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={[styles.content, { backgroundColor: colors.background }]}
        >
          {prescriptions.map((prescription, index) => (
            <AnimatedCard key={prescription.id} style={styles.prescriptionItem} index={index}>
              <View style={[styles.prescriptionIcon, { backgroundColor: colors.primary + "20" }]}>
                <Ionicons name="medical" size={24} color={colors.primary} />
              </View>
              <View style={styles.prescriptionDetails}>
                <Text style={[styles.prescriptionName, { color: colors.text }]}>{prescription.name}</Text>
                <Text style={[styles.prescriptionInfo, { color: colors.textSecondary }]}>
                  {prescription.dosage} • {prescription.frequency}
                </Text>
                <Text style={[styles.prescriptionTime, { color: colors.accent1 }]}>
                  <Ionicons name="time-outline" size={16} color={colors.accent1} /> {prescription.time}
                </Text>
              </View>
            </AnimatedCard>
          ))}
          <ElegantButton
            title="Find Nearby Pharmacies"
            onPress={handleFindPharmacy}
            color="secondary"
            style={styles.findPharmacyButton}
          />
        </Animated.View>
      </ScrollView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  prescriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
  },
  prescriptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  prescriptionDetails: {
    flex: 1,
  },
  prescriptionName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  prescriptionInfo: {
    fontSize: 14,
    marginTop: 5,
  },
  prescriptionTime: {
    fontSize: 14,
    marginTop: 5,
  },
  findPharmacyButton: {
    marginTop: 20,
  },
})

export default PrescriptionScreen

