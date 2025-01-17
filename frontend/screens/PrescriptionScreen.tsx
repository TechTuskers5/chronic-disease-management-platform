import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import ElegantButton from '../components/ElegantButton';

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
    <GradientBackground>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Prescriptions</Text>
        </View>
        <View style={styles.content}>
          {prescriptions.map((prescription, index) => (
            <Card key={prescription.id} style={styles.prescriptionItem} index={index}>
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
            </Card>
          ))}
          <ElegantButton
            title="Find Nearby Pharmacies"
            onPress={handleFindPharmacy}
            color="secondary"
            style={styles.findPharmacyButton}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

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
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  prescriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
  },
  prescriptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
  findPharmacyButton: {
    marginTop: 20,
  },
});

export default PrescriptionScreen;

