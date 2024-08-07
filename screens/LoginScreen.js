import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { isDarkMode, theme } = useTheme(); // Access theme

  const handleLogin = () => {
    // Replace with actual login logic
    if (email === 'test@example.com' && password === 'password') {
      // Reset the navigation stack to Home screen upon successful login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } else {
      // Handle invalid login
      alert('Invalid email or password');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>
      <TextInput
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={[styles.passwordContainer, { borderColor:  isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000'}]}>
        <TextInput
          style={[styles.passwordInput, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showHideButton}
        >
          <Text style={[styles.showHideButtonText, { color: theme.colors.primary }]}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.forgotPasswordButton}
      >
        <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.signupButton}
      >
        <Text style={[styles.signupText, { color: theme.colors.primary }]}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5, // Rounded edges
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5, // Rounded edges
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordInput: {
    flex: 1,
  },
  showHideButton: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  showHideButtonText: {
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '50%', // Reduced width
    alignSelf: 'center', // Center the button
    borderRadius: 5, // Rounded edges
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007BFF',
  },
  signupButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  signupText: {
    color: '#007BFF',
  },
});

export default LoginScreen;
