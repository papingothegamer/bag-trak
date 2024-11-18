import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './nav/AppNavigator';
import { ThemeProvider } from './components/ThemeContext';
import { initializeFirebase } from './services/firebase';

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await initializeFirebase();
        console.log('Notifications initialized');
      } catch (error) {
        console.log('Notification setup error:', error);
      }
    };

    setupNotifications();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
