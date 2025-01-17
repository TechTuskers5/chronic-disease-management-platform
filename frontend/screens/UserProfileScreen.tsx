import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';

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
    <Card style={styles.fieldContainer}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
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
    </Card>
  );

  return (
    <GradientBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>User Profile</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
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
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
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
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 25,
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

