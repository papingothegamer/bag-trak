import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const NotificationSettingsScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Access theme
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Notification Settings</Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>Push Notifications</Text>
      <View style={[styles.switchContainer, { backgroundColor: theme.colors.card }]}>
        <Text style={{ color: theme.colors.text }}>Enable Push Notifications</Text>
        <Switch
          value={isPushEnabled}
          onValueChange={(value) => setIsPushEnabled(value)}
          trackColor={{ false: theme.colors.switchOff, true: theme.colors.switchOn }}
          thumbColor={isPushEnabled ? theme.colors.switchThumbOn : theme.colors.switchThumbOff}
        />
      </View>
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
    padding: 10, // Added padding for better spacing
    borderRadius: 8, // Rounded corners for the switch container
  },
});

export default NotificationSettingsScreen;
