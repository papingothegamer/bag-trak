import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';

export default function PhoneVerificationScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { theme, isDarkMode } = useTheme();

  const handleVerifyPhone = () => {
    if (!/^\+\d{1,4}\d{6,14}$/.test(phoneNumber)) {
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
    <ScreenLayout title="Phone Verification">
      <View style={styles.section}>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          Enter your phone number with country code to receive a verification code
        </Text>
        <TextInput
          placeholder="Enter phone number (+1234567890)"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
          keyboardType="phone-pad"
        />
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleVerifyPhone}
        >
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
            Verify Phone Number
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
