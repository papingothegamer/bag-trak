import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const { theme, isDarkMode } = useTheme(); // Access theme and dark mode

  const handleResetPassword = () => {
    alert('Password reset email sent to ' + email);
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Forgot Password</Text>
      <TextInput
        placeholder="Enter your email"
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
      <Button title="Reset Password" onPress={handleResetPassword} color={theme.colors.primary} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} color={theme.colors.primary} />
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
});
