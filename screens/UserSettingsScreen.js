import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import ScreenLayout from '../components/layout/ScreenLayout';
import AppLanguageSelectionScreen from './AppLanguageSelectionScreen';
import { useTheme } from '../components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const UserSettingsScreen = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setLocationPermission(status);
  };

  const requestLocationPermission = async () => {
    try {
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      
      if (existingStatus === 'granted') {
        Alert.alert('Permission Granted', 'Location access is already enabled');
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status === 'granted') {
        Alert.alert('Success', 'Location access has been granted');
      } else {
        Alert.alert(
          'Permission Required',
          'Location access is required for tracking your bags. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request location permission');
    }
  };

  const renderSettingItem = (icon, title, rightComponent) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>{title}</Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>User Settings</Text>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Display Settings</Text>
            {renderSettingItem(
              'moon-outline',
              'Dark Mode',
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={isDarkMode ? theme.colors.background : '#f4f3f4'}
                ios_backgroundColor={theme.colors.border}
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>App Settings</Text>
            {renderSettingItem(
              'language-outline',
              'App Language',
              <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.languageButton}>
                <Text style={[styles.languageButtonText, { color: theme.colors.primary }]}>{selectedLanguage}</Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>App Permissions</Text>
            {renderSettingItem(
              'location-outline',
              'Location Access',
              <TouchableOpacity onPress={requestLocationPermission} style={styles.permissionStatus}>
                <Text style={[styles.permissionText, { color: locationPermission === 'granted' ? theme.colors.success : theme.colors.error }]}>
                  {locationPermission === 'granted' ? 'Enabled' : 'Disabled'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <AppLanguageSelectionScreen
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectLanguage={setSelectedLanguage}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 16,
    marginRight: 4,
  },
  permissionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default UserSettingsScreen;