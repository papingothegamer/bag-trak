import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../components/ThemeContext';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const { logout, deleteUser } = useAuth();
  const { isDarkMode, theme } = useTheme(); // Ensure theme is accessed here

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from useAuth
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      ); // Redirect to Login screen and reset navigation stack
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
              await deleteUser(); // Call the deleteUser function from useAuth
              Alert.alert('Account Deleted', 'Your account has been deleted.');
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              ); // Redirect to Login screen and reset navigation stack
            } catch (error) {
              Alert.alert('Delete Error', 'An error occurred while deleting the account.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Profile Settings</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Account Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('UserSettings')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>User Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NotificationSettings')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Notification Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.danger }]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : 'black' }]}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.danger }]}
        onPress={handleDeleteAccount}
      >
        <Text style={[styles.buttonText, { color: 'red' }]}>Delete Account</Text>
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
  button: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
