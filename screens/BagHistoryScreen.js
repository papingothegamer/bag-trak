import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import BagCard from '../components/ui/BagCard'; // Import the updated BagCard

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
    <BagCard 
      bag={item}
      isHistory={true} // Use the history variant
      onPress={() => setExpandedBagId(expandedBagId === item.bagId ? null : item.bagId)}
    />
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
