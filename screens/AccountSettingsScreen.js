import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';

const AccountSettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <ScreenLayout title="Account Settings">
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Email Verification</Text>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('EmailVerification')}
            >
              <Ionicons name="mail-outline" size={20} color={theme.colors.buttonText} style={styles.buttonIcon} />
              <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Verify Email</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Phone Verification</Text>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('PhoneVerification')}
            >
              <Ionicons name="phone-portrait-outline" size={20} color={theme.colors.buttonText} style={styles.buttonIcon} />
              <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Verify Phone</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>User Data</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={theme.colors.text} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: theme.colors.text }]}
                placeholder="Name"
                placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={theme.colors.text} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: theme.colors.text }]}
                placeholder="Email"
                placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color={theme.colors.text} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: theme.colors.text }]}
                placeholder="Phone Number"
                placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
              />
            </View>

            <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: '100%',
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    marginTop: 24,
  },
});

export default AccountSettingsScreen;