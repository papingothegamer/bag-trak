import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme, isDarkMode } = useTheme(); // Access theme and dark mode

  const handleSignup = () => {
    // Temporary bypass for testing
    const bypassSignup = true; // Set this to true to bypass signup

    if (bypassSignup) {
      navigation.navigate('Home'); // Directly navigate to Home
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Sign Up</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            borderColor: isDarkMode ? '#333' : '#ccc', // Border color based on theme
            color: isDarkMode ? '#fff' : '#000', // Text color based on theme
          }
        ]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'} // Placeholder text color based on theme
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          {
            borderColor: isDarkMode ? '#333' : '#ccc', // Border color based on theme
            color: isDarkMode ? '#fff' : '#000', // Text color based on theme
          }
        ]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'} // Placeholder text color based on theme
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[
          styles.input,
          {
            borderColor: isDarkMode ? '#333' : '#ccc', // Border color based on theme
            color: isDarkMode ? '#fff' : '#000', // Text color based on theme
          }
        ]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'} // Placeholder text color based on theme
      />
      <Button title="Sign Up" onPress={handleSignup} color={theme.colors.primary} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} color={theme.colors.primary} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={[styles.forgotPassword, { color: theme.colors.link }]}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  forgotPassword: {
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
6