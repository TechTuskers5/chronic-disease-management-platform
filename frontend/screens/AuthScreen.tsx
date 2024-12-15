import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = { email, password };
  
    try {
      const response = await fetch(`http://localhost:${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return;
      }
  
      const data = await response.json();
      console.log(isLogin ? 'Login successful' : 'Signup successful', data);
  
      // Handle successful response
      if (isLogin) {
        const { token } = data; // Assuming the backend sends a JWT or similar token
        if (token) {
          await AsyncStorage.setItem('authToken', token); // Store the token securely
          console.log('Token saved:', token);
        } else {
          console.error('No token received from backend.');
        }
      } else {
        console.log('Signup successful:', data);
        // Optionally, handle post-signup actions here, like navigating to another screen
      }
    } catch (error) {
      console.error('Error connecting to the backend:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Ionicons name="medical" size={80} color={colors.primary} />
          <Text style={[styles.logoText, { color: colors.primary }]}>ChronicCare</Text>
        </View>
        <View style={[styles.formContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleAuth}
          >
            <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={[styles.switchText, { color: colors.accent }]}>
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </Text>
          </TouchableOpacity>
          {isLogin && (
            <TouchableOpacity>
              <Text style={[styles.forgotPassword, { color: colors.secondary }]}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formContainer: {
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AuthScreen;

