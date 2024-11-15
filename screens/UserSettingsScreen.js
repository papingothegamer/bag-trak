import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ScreenLayout from '../components/layout/ScreenLayout';
import AppLanguageSelectionScreen from './AppLanguageSelectionScreen';
import { useTheme } from '../components/ThemeContext';

const UserSettingsScreen = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  return (
    <ScreenLayout title="User Settings">
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Display Settings</Text>
        <View style={styles.switchContainer}>
          <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>App Language</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>{`Language: ${selectedLanguage}`}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>App Permissions</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.buttonText}>Camera Access</Text>
        </TouchableOpacity>
      </View>

      <AppLanguageSelectionScreen
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectLanguage={setSelectedLanguage}
      />
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserSettingsScreen;
