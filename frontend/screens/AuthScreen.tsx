import type React from "react";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import GradientBackground from "../components/GradientBackground";
import AnimatedCard from "../components/AnimatedCard";
import ElegantButton from "../components/ElegantButton";

const AuthScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const endpoint = isLogin ? "http://127.0.0.1:5000/login" : "http://127.0.0.1:5000/register";
    const payload = {
      email,
      password,
      ...(isLogin ? {} : { name, phone: "1234567890" }), // Include name only for signup
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        alert(data.message);
      } else {
        console.error("Error:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Network error, please try again.");
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.logoContainer}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>YOCA</Text>
        </Animated.View>
        <AnimatedCard style={styles.card} index={1}>
          <Text style={[styles.title, { color: colors.text }]}>{isLogin ? "Welcome Back" : "Create Account"}</Text>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
            </View>
          )}
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
          <ElegantButton title={isLogin ? "Log In" : "Sign Up"} onPress={handleAuth} style={styles.button} />
          <Text style={[styles.switchText, { color: colors.primary }]} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
          </Text>
          {isLogin && (
            <Text
              style={[styles.forgotPassword, { color: colors.secondary }]}
              onPress={() => {
                /* Handle forgot password */
              }}
            >
              Forgot Password?
            </Text>
          )}
        </AnimatedCard>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  card: {
    borderRadius: 30,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
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
    textAlign: "center",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
  },
});

export default AuthScreen;