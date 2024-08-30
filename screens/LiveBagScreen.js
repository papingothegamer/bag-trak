import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput } from 'react-native';

const LiveBagScreen = ({ bags, onStopTracking, onDeleteBag }) => {
  const [expandedBagId, setExpandedBagId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBagId(expandedBagId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {bags.map(bag => (
        <TouchableOpacity key={bag.id} onPress={() => toggleExpand(bag.id)} style={styles.bagCard}>
          <Text style={styles.bagId}>{bag.id}</Text>
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
      ))}

      {bags.length > 1 && (
        <View style={styles.recentBagsSection}>
          <Text style={styles.sectionTitle}>Recent Bags</Text>
          <FlatList
            data={bags.slice(1)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.bagCard}>
                <Text style={styles.bagId}>{item.id}</Text>
                <Text style={styles.bagDetails}>Weight: {item.weight} | Airline: {item.airline}</Text>
                <Text style={styles.bagDetails}>From: {item.from} - To: {item.to}</Text>

                {expandedBagId === item.id && (
                  <View style={styles.expandedDetails}>
                    <TouchableOpacity onPress={() => onDeleteBag(item.id)}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bagCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    marginBottom: 15,
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
  recentBagsSection: { marginTop: 20 },
  sectionTitle: { fontSize: 20, marginBottom: 10, fontWeight: 'bold' },
  deleteText: { color: 'red', marginTop: 10 },
});

export default LiveBagScreen;
