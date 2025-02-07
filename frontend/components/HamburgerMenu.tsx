import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HamburgerMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const { colors, toggleTheme, theme } = useTheme();

  const menuItems = [
    { name: 'Home', label: 'Dashboard', icon: 'home-outline' },
    { name: 'Auth', label: 'Login/Signup', icon: 'log-in-outline' },
    { name: 'Reports', label: 'Reports', icon: 'document-text-outline' },
    { name: 'Profile', label: 'User Profile', icon: 'person-outline' },
    { name: 'Prescriptions', label: 'Prescriptions', icon: 'medical-outline' },
    { name: 'Doctors', label: 'Doctor Recommendations', icon: 'people-outline' },
    { name: 'Telemedicine', label: 'Telemedicine', icon: 'videocam-outline' },
    { name: 'Analysis', label: 'Generate Analysis', icon: 'analysis-outline' },
  ];

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>John Doe</Text>
        <Text style={styles.headerSubText}>Patient ID: 123456789</Text>
      </View>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.menuItem,
            { backgroundColor: props.state.routeNames[props.state.index] === item.name ? colors.primaryLight : 'transparent' }
          ]}
          onPress={() => props.navigation.navigate(item.name)}
        >
          <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} color={colors.primary} style={styles.menuIcon} />
          <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.primary} />
        <Text style={[styles.themeToggleText, { color: colors.text }]}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  themeToggleText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default HamburgerMenu;
