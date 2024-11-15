import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';

const AccountSettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <ScreenLayout title="Account Settings">
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Email Verification</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('EmailVerification')}
        >
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Verify Email</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Phone Verification</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('PhoneVerification')}
        >
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Verify Phone</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>User Data</Text>
        <TextInput
          style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: theme.colors.text }]}
          placeholder="Name"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
        <TextInput
          style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: theme.colors.text }]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
        <TextInput
          style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: theme.colors.text }]}
          placeholder="Phone Number"
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  saveButton: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    marginTop: 16,
  },
});

export default AccountSettingsScreen;
