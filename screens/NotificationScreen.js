import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';

const NotificationSettingsScreen = () => {
  const { theme } = useTheme();
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isSMSEnabled, setIsSMSEnabled] = useState(false);

  return (
    <ScreenLayout title="Notifications">
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Push Notifications</Text>
        <View style={[styles.switchContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={{ color: theme.colors.text }}>Enable Push Notifications</Text>
          <Switch
            value={isPushEnabled}
            onValueChange={setIsPushEnabled}
            trackColor={{ false: theme.colors.switchOff, true: theme.colors.switchOn }}
            thumbColor={isPushEnabled ? theme.colors.switchThumbOn : theme.colors.switchThumbOff}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Email Notifications</Text>
        <View style={[styles.switchContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={{ color: theme.colors.text }}>Enable Email Notifications</Text>
          <Switch
            value={isEmailEnabled}
            onValueChange={setIsEmailEnabled}
            trackColor={{ false: theme.colors.switchOff, true: theme.colors.switchOn }}
            thumbColor={isEmailEnabled ? theme.colors.switchThumbOn : theme.colors.switchThumbOff}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SMS Notifications</Text>
        <View style={[styles.switchContainer, { backgroundColor: theme.colors.card }]}>
          <Text style={{ color: theme.colors.text }}>Enable SMS Notifications</Text>
          <Switch
            value={isSMSEnabled}
            onValueChange={setIsSMSEnabled}
            trackColor={{ false: theme.colors.switchOff, true: theme.colors.switchOn }}
            thumbColor={isSMSEnabled ? theme.colors.switchThumbOn : theme.colors.switchThumbOff}
          />
        </View>
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
});

export default NotificationSettingsScreen;
