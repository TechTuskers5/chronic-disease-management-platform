import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { useTheme } from "@/context/ThemeContext"
import Animated, { FadeInDown } from "react-native-reanimated"
import GradientBackground from "@/components/GradientBackground"
import AnimatedCard from "@/components/AnimatedCard"
import ElegantButton from "@/components/ElegantButton"

interface Doctor {
  id: string
  name: string
  specialty: string
  available: boolean
}

const TelemedicineScreen: React.FC = () => {
  const { colors } = useTheme()
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: "1", name: "Dr. John Smith", specialty: "Cardiologist", available: true },
    { id: "2", name: "Dr. Emily Brown", specialty: "Dermatologist", available: false },
    { id: "3", name: "Dr. Michael Lee", specialty: "Neurologist", available: true },
  ])

  const renderDoctorItem = ({ item, index }: { item: Doctor; index: number }) => (
    <AnimatedCard style={styles.doctorItem} index={index}>
      <View style={styles.doctorInfo}>
        <Text style={[styles.doctorName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>{item.specialty}</Text>
      </View>
      <ElegantButton
        title="Call"
        onPress={() => {
          /* Handle video call */
        }}
        color={item.available ? "primary" : "secondary"}
        style={styles.callButton}
        textStyle={styles.callButtonText}
      />
    </AnimatedCard>
  )

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.headerText}>Telemedicine</Text>
        <Text style={styles.headerSubtext}>Connect with doctors virtually</Text>
      </View>
      <Animated.View entering={FadeInDown.delay(200)} style={[styles.content, { backgroundColor: colors.background }]}>
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </Animated.View>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
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
  headerSubtext: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  listContainer: {
    padding: 20,
  },
  doctorItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  doctorSpecialty: {
    fontSize: 14,
    marginTop: 5,
  },
  callButton: {
    width: 100,
  },
  callButtonText: {
    fontSize: 14,
  },
})

export default TelemedicineScreen

