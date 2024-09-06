import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const RecentBags = ({ removedBags, onDeleteBag }) => {
  const { theme } = useTheme(); // Access theme

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.colors.titleText }]}>Recent Bags</Text>
      {removedBags.length > 0 ? (
        <FlatList
          data={removedBags}
          renderItem={({ item }) => (
            <View style={styles.bagCard}>
              <Text style={styles.bagId}>Bag ID: {item.id}</Text>
              <Text style={styles.bagDetails}>Weight: {item.weight} | Airline: {item.airline}</Text>
              <Text style={styles.bagDetails}>Stopped at: {item.stoppedAt}</Text>
              <TouchableOpacity onPress={() => onDeleteBag(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No bags have been recently stopped.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bagCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    marginBottom: 15,
    alignItems: 'flex-start',
    width: '100%',
  },
  bagId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bagDetails: {
    fontSize: 16,
    marginTop: 5,
  },
  deleteText: {
    color: 'red',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default RecentBags;
