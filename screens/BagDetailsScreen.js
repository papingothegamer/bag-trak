import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

export default function BagDetailsScreen({ route, navigation }) {
  const { bagId } = route.params;

  // Replace with real data fetching logic
  const bag = { id: bagId, name: `Bag ${bagId}`, status: 'Checked In', lastLocation: 'JFK Airport' };

  const { theme } = useTheme(); // Access theme

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{bag.name}</Text>
      <Text style={[styles.detail, { color: theme.colors.text }]}>Status: {bag.status}</Text>
      <Text style={[styles.detail, { color: theme.colors.text }]}>Last Location: {bag.lastLocation}</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});
