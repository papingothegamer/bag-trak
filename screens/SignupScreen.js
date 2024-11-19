import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  const handleSignup = () => {
    // Temporary bypass for testing
    const bypassSignup = true;

    if (bypassSignup) {
      navigation.navigate('Home');
      return;
    }

    // Existing signup logic...
    // if (signup(name, email, password)) {
    //   navigation.navigate('Login');
    // } else {
    //   alert('Signup failed');
    // }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Join the Adventure!</Text>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>Create your account to track your bags</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color={theme.colors.text} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Name"
            placeholderTextColor={theme.colors.text + '80'}
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color={theme.colors.text} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Email"
            placeholderTextColor={theme.colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color={theme.colors.text} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: theme.colors.text }]}
            placeholder="Password"
            placeholderTextColor={theme.colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showHideButton}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.colors.text }]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginButtonText, { color: theme.colors.primary }]}>Login</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordButton}>
          <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Arial', // Change to a more travel-related font if available
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic', // Italic for a more casual feel
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  showHideButton: {
    padding: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 16,
  },
});

export default SignupScreen;