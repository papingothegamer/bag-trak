import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddBagScreen from '../screens/AddBagScreen';
import TrackBagScreen from '../screens/TrackBagScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddBag" component={AddBagScreen} />
        <Stack.Screen name="TrackBag" component={TrackBagScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
