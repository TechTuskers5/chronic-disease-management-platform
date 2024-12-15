import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import MedicationReminder from '../components/MedicationReminder';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();

  const healthStats = [
    { icon: 'heart-outline' as const, label: 'Heart Rate', value: '72 bpm' },
    { icon: 'fitness-outline' as const, label: 'Blood Pressure', value: '120/80' },
    { icon: 'water-outline' as const, label: 'Blood Sugar', value: '100 mg/dL' },
    { icon: 'thermometer-outline' as const, label: 'Temperature', value: '98.6 °F' },
  ];

  const quickActions = [
    { icon: 'calendar-outline' as const, label: 'Appointments' },
    { icon: 'medical-outline' as const, label: 'Medications' },
    { icon: 'document-text-outline' as const, label: 'Reports' },
    { icon: 'call-outline' as const, label: 'Contact Doctor' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Welcome, John</Text>
        <Text style={styles.headerSubText}>Let's check your health today</Text>
      </View>

      <View style={styles.statsContainer}>
        {healthStats.map((stat, index) => (
          <View key={index} style={[styles.statItem, { backgroundColor: colors.surface }]}>
            <Ionicons name={stat.icon} size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.quickActionItem, { backgroundColor: colors.surface }]}>
              <Ionicons name={action.icon} size={24} color={colors.primary} />
              <Text style={[styles.quickActionLabel, { color: colors.text }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Appointments</Text>
        <View style={[styles.appointmentItem, { backgroundColor: colors.surface }]}>
          <Ionicons name="calendar" size={24} color={colors.primary} />
          <View style={styles.appointmentDetails}>
            <Text style={[styles.appointmentTitle, { color: colors.text }]}>Dr. Sarah Johnson</Text>
            <Text style={[styles.appointmentSubtitle, { color: colors.textSecondary }]}>Cardiologist • Tomorrow, 10:00 AM</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Medication Reminders</Text>
        <MedicationReminder
          medication="Lisinopril"
          time="12:00 PM"
          onTake={() => console.log('Medication taken')}
          onSkip={() => console.log('Medication skipped')}
        />
        <MedicationReminder
          medication="Metformin"
          time="6:00 PM"
          onTake={() => console.log('Medication taken')}
          onSkip={() => console.log('Medication skipped')}
        />
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
  headerSubText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  statItem: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionLabel: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentDetails: {
    marginLeft: 15,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;