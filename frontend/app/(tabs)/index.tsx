import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider } from '@/context/ThemeContext';
import HomeScreen from '@/screens/HomeScreen';
import AuthScreen from '@/screens/AuthScreen';
import ReportsScreen from '@/screens/ReportsScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import PrescriptionScreen from '@/screens/PrescriptionScreen';
import DoctorRecommendationsScreen from '@/screens/DoctorRecommendationsScreen';
import HamburgerMenu from '@/components/HamburgerMenu';
import TelemedicineScreen from '@/screens/TelemedicineScreen';

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <Drawer.Navigator
          drawerContent={(props) => <HamburgerMenu {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0078D4',
            },
            headerTintColor: '#fff',
          }}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Auth" component={AuthScreen} />
          <Drawer.Screen name="Reports" component={ReportsScreen} />
          <Drawer.Screen name="Profile" component={UserProfileScreen} />
          <Drawer.Screen name="Prescriptions" component={PrescriptionScreen} />
          <Drawer.Screen name="Doctors" component={DoctorRecommendationsScreen} />
          <Drawer.Screen name="Telemedicine" component={TelemedicineScreen} />
        </Drawer.Navigator>
    </ThemeProvider>
  );
};

export default App;

