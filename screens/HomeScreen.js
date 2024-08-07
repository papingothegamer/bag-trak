import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Access theme

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Home Screen</Text>
      <Button
        title="Add New Bag"
        onPress={() => navigation.navigate('AddBag')}
        color={theme.colors.primary}
      />
      <Button
        title="Track Bag"
        onPress={() => navigation.navigate('TrackBag')}
        color={theme.colors.primary}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
        color={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
