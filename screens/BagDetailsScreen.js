import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function BagDetailsScreen({ route, navigation }) {
  const { bagId } = route.params;

  // Replace with real data fetching logic
  const bag = { id: bagId, name: `Bag ${bagId}`, status: 'Checked In', lastLocation: 'JFK Airport' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bag.name}</Text>
      <Text style={styles.detail}>Status: {bag.status}</Text>
      <Text style={styles.detail}>Last Location: {bag.lastLocation}</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
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
