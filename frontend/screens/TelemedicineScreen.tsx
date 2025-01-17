import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
}

const TelemedicineScreen: React.FC = () => {
  const { colors } = useTheme();
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. John Smith', specialty: 'Cardiologist', available: true },
    { id: '2', name: 'Dr. Emily Brown', specialty: 'Dermatologist', available: false },
    { id: '3', name: 'Dr. Michael Lee', specialty: 'Neurologist', available: true },
  ]);

  const renderDoctorItem = ({ item, index }: { item: Doctor; index: number }) => (
    <Card style={styles.doctorItem} index={index}>
      <View style={styles.doctorInfo}>
        <Text style={[styles.doctorName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>{item.specialty}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.callButton,
          { backgroundColor: item.available ? colors.primary : colors.textSecondary }
        ]}
        disabled={!item.available}
      >
        <Ionicons name="videocam-outline" size={24} color="white" />
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Telemedicine" subtitle="Connect with doctors virtually" />
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  doctorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
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
  callButton: {
    padding: 10,
    borderRadius: 25,
  },
});

export default TelemedicineScreen;

