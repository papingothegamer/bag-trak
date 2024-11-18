import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddBagScreen from '../screens/AddBagScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import BagHistoryScreen from '../screens/BagHistoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerLeft: null }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddBag" 
        component={AddBagScreen}
        options={{
          title: 'Add New Bag',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="AccountSettings" 
        component={AccountSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EmailVerification" 
        component={EmailVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PhoneVerification" 
        component={PhoneVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="UserSettings" 
        component={UserSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BagHistory" component={BagHistoryScreen} />
    </Stack.Navigator>
  );
}
