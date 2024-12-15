import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface MedicationReminderProps {
  medication: string;
  time: string;
  onTake: () => void;
  onSkip: () => void;
}

const MedicationReminder: React.FC<MedicationReminderProps> = ({ medication, time, onTake, onSkip }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.infoContainer}>
        <Ionicons name="medical-outline" size={24} color={colors.primary} />
        <View style={styles.textContainer}>
          <Text style={[styles.medicationName, { color: colors.text }]}>{medication}</Text>
          <Text style={[styles.medicationTime, { color: colors.textSecondary }]}>{time}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onTake}>
          <Text style={styles.buttonText}>Take</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.error }]} onPress={onSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationTime: {
    fontSize: 14,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MedicationReminder;

