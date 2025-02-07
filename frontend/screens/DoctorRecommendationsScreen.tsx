import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, FlatList, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import GradientBackground from "../components/GradientBackground"
import AnimatedCard from "../components/AnimatedCard"
import ElegantButton from "../components/ElegantButton"

const DoctorRecommendationsScreen: React.FC = () => {
  const { colors } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")

  const allDoctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      specialty: "Endocrinologist",
      rating: 4.9,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Dr. Michael Lee",
      specialty: "Neurologist",
      rating: 4.7,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Dr. Emily Brown",
      specialty: "Pediatrician",
      rating: 4.6,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Dr. David Wilson",
      specialty: "Orthopedist",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ]

  const [doctors, setDoctors] = useState(allDoctors)

  const handleSearch = () => {
    const filteredDoctors = allDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setDoctors(filteredDoctors)
  }

  const handleBookAppointment = (doctorId: number) => {
    // Implement booking logic
    console.log("Booking appointment with doctor ID:", doctorId)
  }

  const renderDoctorItem = ({ item, index }: { item: (typeof allDoctors)[0]; index: number }) => (
    <AnimatedCard style={styles.doctorItem} index={index}>
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={[styles.doctorName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>{item.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={colors.primary} />
          <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
        </View>
      </View>
      <ElegantButton
        title="Book"
        onPress={() => handleBookAppointment(item.id)}
        color="secondary"
        style={styles.bookButton}
      />
    </AnimatedCard>
  )

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find a Doctor</Text>
      </View>
      <Animated.View entering={FadeInDown.delay(200)} style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: colors.surface }]}>
            <Ionicons name="search-outline" size={24} color={colors.primary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search by name or specialty"
              placeholderTextColor={colors.textSecondary}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <ElegantButton title="Search" onPress={handleSearch} color="primary" style={styles.searchButton} />
        </View>
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.doctorsContainer}
        />
      </Animated.View>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  searchButton: {
    width: 100,
  },
  doctorsContainer: {
    padding: 20,
  },
  doctorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
  },
  bookButton: {
    width: 100,
  },
})

export default DoctorRecommendationsScreen

