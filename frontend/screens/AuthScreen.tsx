import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import ElegantButton from '@/components/ElegantButton';

const AuthScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    // ... (keep the existing handleAuth logic)
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')} // Make sure to add a logo image
            style={styles.logo}
          />
          <Text style={styles.logoText}>ChronicCare</Text>
        </View>
        <Card style={styles.card}>
          <Text style={[styles.title, { color: colors.text }]}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color={colors.primary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color={colors.primary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <ElegantButton
            title={isLogin ? 'Log In' : 'Sign Up'}
            onPress={handleAuth}
            style={styles.button}
          />
          <Text
            style={[styles.switchText, { color: colors.primary }]}
            onPress={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </Text>
          {isLogin && (
            <Text
              style={[styles.forgotPassword, { color: colors.secondary }]}
              onPress={() => {/* Handle forgot password */}}
            >
              Forgot Password?
            </Text>
          )}
        </Card>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  card: {
    borderRadius: 30,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
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

