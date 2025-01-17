import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const PrescriptionScreen: React.FC = () => {
  const { colors } = useTheme();

  const prescriptions = [
    { id: 1, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '9:00 AM, 9:00 PM' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: '8:00 AM' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', time: '10:00 PM' },
  ];

  const handleFindPharmacy = () => {
    // Implement find pharmacy logic
    console.log('Finding nearby pharmacies...');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Your Prescriptions</Text>
      </View>

      <View style={styles.content}>
        {prescriptions.map((prescription) => (
          <View key={prescription.id} style={[styles.prescriptionItem, { backgroundColor: colors.surface }]}>
            <View style={styles.prescriptionIcon}>
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
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.secondary }]} 
          onPress={handleFindPharmacy}
        >
          <Ionicons name="location-outline" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Find Nearby Pharmacies</Text>
        </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  prescriptionItem: {
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
  prescriptionIcon: {
    marginRight: 15,
  },
  prescriptionDetails: {
    flex: 1,
  },
  prescriptionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  prescriptionInfo: {
    fontSize: 14,
    marginTop: 5,
  },
  prescriptionTime: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrescriptionScreen;

