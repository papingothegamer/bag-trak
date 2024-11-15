import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';

export default function EmailVerificationScreen() {
  const [email, setEmail] = useState('');
  const { theme, isDarkMode } = useTheme();

  const handleVerifyEmail = () => {
    Alert.alert('Verification Email Sent', 'A verification email has been sent to ' + email);
  };

  return (
    <ScreenLayout title="Email Verification">
      <View style={styles.section}>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          Enter your email address to receive a verification link
        </Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleVerifyEmail}
        >
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
            Send Verification Email
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
