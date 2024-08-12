import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const AccountSettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme(); // Access theme and dark mode

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.titleText }]}>Account Settings</Text>
      
      <Text style={[styles.label, { color: theme.colors.text }]}>Email Verification</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('EmailVerification')}  // Navigate to EmailVerificationScreen
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Verify Email</Text>
      </TouchableOpacity>
      
      <Text style={[styles.label, { color: theme.colors.text }]}>Phone Verification</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('PhoneVerification')} // Navigate to PhoneVerificationScreen
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Verify Phone</Text>
      </TouchableOpacity>
      
      <Text style={[styles.label, { color: theme.colors.text }]}>User Data</Text>
      <TextInput
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Name"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
      <TextInput
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
      <TextInput
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholder="Phone Number"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />

      <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}>
        <Text style={[styles.saveButtonText, { color: theme.colors.buttonText }]}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5, // Rounded edges
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
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
  saveButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '50%', // Reduced width
    alignSelf: 'center', // Center the button
    borderRadius: 5, // Rounded edges
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
  },
});

export default AccountSettingsScreen;
