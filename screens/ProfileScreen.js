import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../components/ThemeContext';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { logout, deleteUser } = useAuth();
  const { isDarkMode, theme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      Alert.alert('Logout Error', 'An error occurred during logout.');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser();
              Alert.alert('Account Deleted', 'Your account has been deleted.');
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              );
            } catch (error) {
              Alert.alert('Delete Error', 'An error occurred while deleting the account.');
            }
          },
        },
      ]
    );
  };

  const renderSettingsButton = (iconName, title, onPress) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={24} color={theme.colors.primary} style={styles.buttonIcon} />
      <Text style={[styles.buttonText, { color: theme.colors.text }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="person-circle" size={80} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>John Doe</Text>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>john.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings</Text>
          {renderSettingsButton("person-outline", "Account Settings", () => navigation.navigate('AccountSettings'))}
          {renderSettingsButton("settings-outline", "User Settings", () => navigation.navigate('UserSettings'))}
          {renderSettingsButton("notifications-outline", "Notification Settings", () => navigation.navigate('NotificationSettings'))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tracking History</Text>
          {renderSettingsButton("time-outline", "Bag History", () => navigation.navigate('BagHistory'))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account Actions</Text>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton, { backgroundColor: theme.colors.card }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color={theme.colors.danger} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: theme.colors.danger }]}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton, { backgroundColor: theme.colors.card }]}
            onPress={handleDeleteAccount}
          >
            <Ionicons name="trash-outline" size={24} color={theme.colors.danger} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: theme.colors.danger }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    opacity: 0.7,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 16,
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
  },
  logoutButton: {
    marginTop: 8,
  },
  deleteButton: {
    marginTop: 8,
  },
});

export default ProfileScreen;