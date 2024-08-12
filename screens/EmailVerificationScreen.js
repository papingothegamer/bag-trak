import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';

export default function EmailVerificationScreen() {
  const [email, setEmail] = useState('');
  const { theme } = useTheme(); // Access theme

  const handleVerifyEmail = () => {
    Alert.alert('Verification Email Sent', 'A verification email has been sent to ' + email);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Verify Your Email</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor={theme.colors.placeholder}  // Placeholder color based on theme
        value={email}
        onChangeText={setEmail}
        style={[
          styles.input,
          { 
            borderColor: theme.colors.border,
            color: theme.colors.text,  // Text color based on theme
          }
        ]}
        keyboardType="email-address"
      />
      <Button title="Verify Email" onPress={handleVerifyEmail} color={theme.colors.primary} />
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
