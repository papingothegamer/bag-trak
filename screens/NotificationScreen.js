import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';

const NotificationSettingsScreen = () => {
  const { theme } = useTheme();
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isSMSEnabled, setIsSMSEnabled] = useState(false);

  const renderNotificationSetting = (title, description, value, onValueChange, icon) => (
    <View style={[styles.settingContainer, { backgroundColor: theme.colors.card }]}>
      <View style={styles.settingContent}>
        <Ionicons name={icon} size={24} color={theme.colors.primary} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.colors.switchOff, true: theme.colors.primary }}
        thumbColor={value ? theme.colors.switchThumbOn : theme.colors.switchThumbOff}
        ios_backgroundColor={theme.colors.switchOff}
      />
    </View>
  );

  return (
    <ScreenLayout title="Notifications">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notification Channels</Text>
        
        {renderNotificationSetting(
          "Push Notifications",
          "Receive instant updates on your device",
          isPushEnabled,
          setIsPushEnabled,
          "notifications-outline"
        )}
        
        {renderNotificationSetting(
          "Email Notifications",
          "Get updates in your inbox",
          isEmailEnabled,
          setIsEmailEnabled,
          "mail-outline"
        )}
        
        {renderNotificationSetting(
          "SMS Notifications",
          "Receive text messages for important alerts",
          isSMSEnabled,
          setIsSMSEnabled,
          "chatbubble-outline"
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Manage notification preferences"
        >
          <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Manage Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationSettingsScreen;