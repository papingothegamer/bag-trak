import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const LiveBagScreen = ({ bags, onStopTracking }) => {
  const { theme } = useTheme(); // Access theme
  const [expandedBagId, setExpandedBagId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBagId(expandedBagId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.colors.titleText }]}>Live Bags</Text>
      {bags.length > 0 ? (
        bags.map(bag => (
          <TouchableOpacity key={bag.id} onPress={() => toggleExpand(bag.id)} style={styles.bagCard}>
            <Text style={styles.bagId}>Bag ID: {bag.id}</Text>
            <Text style={styles.bagDetails}>Weight: {bag.weight} | Airline: {bag.airline}</Text>
            <Text style={styles.bagDetails}>From: {bag.from} - To: {bag.to}</Text>

            {expandedBagId === bag.id && (
              <View style={styles.expandedDetails}>
                <Text>Flight Time: {bag.flightTime}</Text>
                <TouchableOpacity onPress={() => onStopTracking(bag.id)}>
                  <Text style={styles.stopTrackingText}>Stop Tracking</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noBagsText}>No bags are currently being tracked.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bagCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
    width: '100%',
  },
  bagId: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  bagDetails: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  expandedDetails: {
    marginTop: 10,
  },
  stopTrackingText: {
    marginTop: 10,
    color: 'red',
  },
  noBagsText: { fontSize: 18, color: 'grey', marginTop: 20 },
});

export default LiveBagScreen;
