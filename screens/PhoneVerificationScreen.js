import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';

export default function PhoneVerificationScreen() {
  const [fullPhoneNumber, setFullPhoneNumber] = useState(''); // Combined phone code and number
  const { theme } = useTheme(); // Access theme
  const isDarkMode = theme.dark; // Check if dark mode is enabled

  const handleVerifyPhone = () => {
    // Validate the phone number
    if (!/^\+\d{1,4}\d{6,14}$/.test(fullPhoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number including the country code.');
      return;
    }

    Alert.alert(
      'Choose Verification Method',
      'Would you like to verify via SMS or Phone Call?',
      [
        { text: 'SMS', onPress: () => alert('SMS Verification Selected') },
        { text: 'Phone Call', onPress: () => alert('Phone Call Verification Selected') },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Verify Your Phone Number</Text>
      <TextInput
        placeholder="Enter your number with country code (+44- number)"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}  // Custom placeholder text color
        value={fullPhoneNumber}
        onChangeText={setFullPhoneNumber}
        style={[
          styles.phoneInput,
          { 
            borderColor: theme.colors.border,
            color: theme.colors.text,  // Text color based on theme
          }
        ]}
        keyboardType="phone-pad"
      />
      <Button title="Verify Phone" onPress={handleVerifyPhone} color={theme.colors.primary} />
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
  phoneInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
