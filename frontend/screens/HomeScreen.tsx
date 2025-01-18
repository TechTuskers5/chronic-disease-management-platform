import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedCard from '../components/AnimatedCard';
import GradientBackground from '../components/GradientBackground';
import ElegantButton from '../components/ElegantButton';

const HomeScreen: React.FC = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const healthStats = [
    { icon: 'heart-outline', label: 'Heart Rate', value: '72 bpm', gradient: [colors.accent1, `${colors.accent1}80`] as const },
    { icon: 'fitness-outline', label: 'Blood Pressure', value: '120/80', gradient: [colors.accent2, `${colors.accent2}80`] as const },
    { icon: 'water-outline', label: 'Blood Sugar', value: '100 mg/dL', gradient: [colors.accent3, `${colors.accent3}80`] as const },
    { icon: 'thermometer-outline', label: 'Temperature', value: '98.6 °F', gradient: [colors.accent4, `${colors.accent4}80`] as const },
  ];

  const renderHealthStat = (stat: typeof healthStats[0], index: number) => (
    <AnimatedCard key={index} style={styles.statItem} index={index} isVisible={isVisible}>
      <LinearGradient
        colors={stat.gradient}
        style={styles.statIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* @ts-ignore */}
        <Ionicons name={stat.icon} size={24} color="white" />
      </LinearGradient>
      <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
    </AnimatedCard>
  );

  return (
    <GradientBackground>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>John Doe</Text>
          </View>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Ionicons name={theme === 'light' ? 'moon' : 'sunny'} size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Health Stats</Text>
          <View style={styles.statsContainer}>
            {healthStats.map(renderHealthStat)}
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Appointment</Text>
          <AnimatedCard style={styles.appointmentCard} index={5} isVisible={isVisible}>
            <View style={styles.appointmentHeader}>
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <Text style={[styles.appointmentTitle, { color: colors.text }]}>Dr. Sarah Johnson</Text>
            </View>
            <Text style={[styles.appointmentDetails, { color: colors.textSecondary }]}>Cardiologist • Tomorrow, 10:00 AM</Text>
            <ElegantButton
              title="View Details"
              onPress={() => {/* Handle view details */}}
              color="secondary"
              style={styles.viewButton}
            />
          </AnimatedCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {['Medications', 'Reports', 'Messages', 'Settings'].map((action, index) => (
              <TouchableOpacity key={index} style={[styles.quickActionItem, { backgroundColor: colors.surface }]}>
                <LinearGradient
                  colors={colors.buttonGradient}
                  style={styles.quickActionIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={getIconForAction(action)} size={24} color="white" />
                </LinearGradient>
                <Text style={[styles.quickActionLabel, { color: colors.text }]}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const getIconForAction = (action: string) => {
  switch (action) {
    case 'Medications': return 'medical-outline';
    case 'Reports': return 'document-text-outline';
    case 'Messages': return 'chatbubble-outline';
    case 'Settings': return 'settings-outline';
    default: return 'help-outline';
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  greeting: {
    fontSize: 16,
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  themeToggle: {
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  appointmentCard: {
    marginTop: 10,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  appointmentDetails: {
    fontSize: 14,
    marginBottom: 15,
  },
  viewButton: {
    alignSelf: 'flex-end',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quickActionItem: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;

