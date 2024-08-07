import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './nav/AppNavigator';
import { ThemeProvider } from './components/ThemeContext'; // Import ThemeProvider

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
