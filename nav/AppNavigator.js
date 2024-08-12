import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../components/ThemeContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddBagScreen from '../screens/AddBagScreen';
import TrackBagScreen from '../screens/TrackBagScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#333' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
        cardStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddBag" component={AddBagScreen} />
      <Stack.Screen name="TrackBag" component={TrackBagScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
      <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
