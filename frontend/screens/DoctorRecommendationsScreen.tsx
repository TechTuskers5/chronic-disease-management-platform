import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const DoctorRecommendationsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const allDoctors = [
    { id: 1, name: 'Dr. John Smith', specialty: 'Cardiologist', rating: 4.8, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Endocrinologist', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Dr. Michael Lee', specialty: 'Neurologist', rating: 4.7, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Dr. Emily Brown', specialty: 'Pediatrician', rating: 4.6, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'Dr. David Wilson', specialty: 'Orthopedist', rating: 4.8, image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ];

  const [doctors, setDoctors] = useState(allDoctors);

  const handleSearch = () => {
    const filteredDoctors = allDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDoctors(filteredDoctors);
  };

  const handleBookAppointment = (doctorId: number) => {
    // Implement booking logic
    console.log('Booking appointment with doctor ID:', doctorId);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Find a Doctor</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.surface }]}>
          <Ionicons name="search-outline" size={24} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by name or specialty"
            placeholderTextColor={colors.textSecondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: colors.primary }]} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.doctorsContainer}>
        {doctors.map((doctor) => (
          <View key={doctor.id} style={[styles.doctorItem, { backgroundColor: colors.surface }]}>
            <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={[styles.doctorName, { color: colors.text }]}>{doctor.name}</Text>
              <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>{doctor.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.accent} />
                <Text style={[styles.ratingText, { color: colors.text }]}>{doctor.rating}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.bookButton, { backgroundColor: colors.secondary }]} 
              onPress={() => handleBookAppointment(doctor.id)}
            >
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  doctorsContainer: {
    padding: 20,
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
  },
  bookButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DoctorRecommendationsScreen;

