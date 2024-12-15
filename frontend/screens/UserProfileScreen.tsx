import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    dob: '01/15/1980',
    bloodType: 'A+',
    allergies: 'None',
    medications: 'Lisinopril, Metformin',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated details to your backend
    console.log('Saving profile...', userDetails);
  };

  const renderField = (label: string, value: string, field: keyof typeof userDetails, icon: keyof typeof Ionicons.glyphMap) => (
    <View style={[styles.fieldContainer, { backgroundColor: colors.surface }]}>
      <Ionicons name={icon} size={24} color={colors.primary} style={styles.fieldIcon} />
      <View style={styles.fieldContent}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { color: colors.text }]}
            value={value}
            onChangeText={(text) => setUserDetails({ ...userDetails, [field]: text })}
          />
        ) : (
          <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>{userDetails.name}</Text>
        <Text style={styles.headerSubText}>Patient ID: 123456789</Text>
      </View>

      <View style={styles.content}>
        {renderField('Name', userDetails.name, 'name', 'person-outline')}
        {renderField('Email', userDetails.email, 'email', 'mail-outline')}
        {renderField('Phone', userDetails.phone, 'phone', 'call-outline')}
        {renderField('Date of Birth', userDetails.dob, 'dob', 'calendar-outline')}
        {renderField('Blood Type', userDetails.bloodType, 'bloodType', 'water-outline')}
        {renderField('Allergies', userDetails.allergies, 'allergies', 'alert-circle-outline')}
        {renderField('Medications', userDetails.medications, 'medications', 'medical-outline')}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={isEditing ? handleSave : handleEdit}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
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
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 20,
  },
  fieldContainer: {
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
  fieldIcon: {
    marginRight: 15,
  },
  fieldContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    padding: 0,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;

