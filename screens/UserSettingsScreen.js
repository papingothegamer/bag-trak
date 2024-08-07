import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import AppLanguageSelectionScreen from './AppLanguageSelectionScreen';

const UserSettingsScreen = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>User Settings</Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>Display Settings</Text>
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => toggleTheme(value)}
        />
      </View>

      <Text style={[styles.label, { color: theme.colors.text }]}>App Language</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={openModal}
      >
        <Text style={styles.buttonText}>{`Language: ${selectedLanguage}`}</Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: theme.colors.text }]}>App Permissions</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.buttonText}>Camera Access</Text>
      </TouchableOpacity>

      <AppLanguageSelectionScreen
        isVisible={isModalVisible}
        onClose={closeModal}
        onSelectLanguage={handleLanguageSelect}
      />
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserSettingsScreen;
