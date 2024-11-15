import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StoppedBagCard = ({ bag }) => {
  return (
    <View style={styles.bagCard}>
      <Text style={styles.bagId}>Bag ID: {bag.id}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Flight: {bag.flight}</Text>
        <Text style={styles.detailText}>Route: {bag.from} - {bag.to}</Text>
        <Text style={styles.detailText}>Status: Tracking Completed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bagCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#808080',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bagId: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
  },
  details: {
    marginTop: 8,
  },
  detailText: {
    color: 'white',
    marginBottom: 6,
    fontSize: 14,
  },
});

export default StoppedBagCard;