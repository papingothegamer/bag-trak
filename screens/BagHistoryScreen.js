import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const BagHistoryScreen = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all'); // 'week', 'month', 'year', 'all'
  const [bagHistory, setBagHistory] = useState([]);
  const [expandedBagId, setExpandedBagId] = useState(null); // State for expanded bag details

  useEffect(() => {
    const fetchLoggedBags = async () => {
      setIsLoading(true);
      const bags = await AsyncStorage.getItem('loggedBags');
      if (bags) {
        setBagHistory(JSON.parse(bags));
      }
      setIsLoading(false);
    };

    fetchLoggedBags();
  }, []);

  const renderTimeFilterButton = (label, value) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        timeFilter === value && { backgroundColor: theme.colors.primary },
      ]}
      onPress={() => setTimeFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          { color: timeFilter === value ? 'white' : theme.colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderBagItem = ({ item }) => (
    <View style={[styles.bagItem, { backgroundColor: theme.colors.card }]}>
      <TouchableOpacity onPress={() => setExpandedBagId(expandedBagId === item.bagId ? null : item.bagId)}>
        <View style={styles.bagHeader}>
          <MaterialIcons name="luggage" size={24} color={theme.colors.primary} />
          <Text style={[styles.bagId, { color: theme.colors.text }]}>
            {item.bagId}
          </Text>
          <Text style={[styles.date, { color: theme.colors.text + '80' }]}>
            {item.date}
          </Text>
        </View>
        
        <View style={styles.flightInfo}>
          <View style={styles.routeContainer}>
            <Text style={[styles.airport, { color: theme.colors.text }]}>{item.origin}</Text>
            <Ionicons name="arrow-forward" size={20} color={theme.colors.text} style={styles.arrow} />
            <Text style={[styles.airport, { color: theme.colors.text }]}>{item.destination}</Text>
          </View>
          <Text style={[styles.airline, { color: theme.colors.text + '80' }]}>
            {item.airline} - {item.flightNumber}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: theme.colors.primary }]}>
            {item.status}
          </Text>
          <Text style={[styles.duration, { color: theme.colors.text + '80' }]}>
            Duration: {item.duration}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown for additional bag details */}
      {expandedBagId === item.bagId && (
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>Stopped At: {item.stoppedAt}</Text>
          <Text style={[styles.detailText, { color: theme.colors.text }]}>Status: {item.status}</Text>
        </View>
      )}
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <MaterialIcons name="history" size={64} color={theme.colors.primary} />
      <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
        No bag history yet
      </Text>
      <Text style={[styles.emptyStateSubtext, { color: theme.colors.text + '80' }]}>
        Your tracked bags will appear here
      </Text>
    </View>
  );

  return (
    <ScreenLayout title="Bag History">
      <View style={styles.filterContainer}>
        {renderTimeFilterButton('Week', 'week')}
        {renderTimeFilterButton('Month', 'month')}
        {renderTimeFilterButton('Year', 'year')}
        {renderTimeFilterButton('All', 'all')}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      ) : bagHistory.length > 0 ? (
        <FlatList
          data={bagHistory}
          renderItem={renderBagItem}
          keyExtractor={(item) => item.bagId} // Ensure unique key
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  bagItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bagId: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  date: {
    fontSize: 14,
  },
  flightInfo: {
    marginBottom: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  airport: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrow: {
    marginHorizontal: 8,
  },
  airline: {
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  duration: {
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  detailText: {
    fontSize: 14,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 16,
    marginTop: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BagHistoryScreen;
