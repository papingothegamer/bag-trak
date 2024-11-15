import React, { useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import LiveBagScreen from './LiveBagScreen';
import RecentBags from './RecentBags';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import { useTheme } from '../components/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [bags, setBags] = useState([]);
  const [recentBags, setRecentBags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStopTracking = (bagId) => {
    const bagToRemove = bags.find(bag => bag.id === bagId);
    if (bagToRemove) {
      setBags(bags.filter(bag => bag.id !== bagId));
      const bagWithTimestamp = { ...bagToRemove, stoppedAt: new Date().toLocaleString() };
      setRecentBags(prevBags => [bagWithTimestamp, ...prevBags]);
    }
  };

  const handleDeleteBag = (bagId) => {
    setRecentBags(prevBags => prevBags.filter(bag => bag.id !== bagId));
  };

  const handleAddBag = useCallback((newBag) => {
    setBags(prevBags => [newBag, ...prevBags]);
  }, []);

  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <MaterialIcons name="luggage" size={64} color={theme.colors.primary} />
      <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
        No bags added yet
      </Text>
      <Text style={[styles.emptyStateSubtext, { color: theme.colors.text + '80' }]}>
        Tap the + button to add your first bag
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}
          style={styles.iconButton}
        >
          <Ionicons name="person-circle-outline" size={28} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>My Bags</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('UserSettings')}
          style={styles.iconButton}
        >
          <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.text} style={styles.searchIcon} />
        <TextInput 
          placeholder="Search bags..."
          placeholderTextColor={theme.colors.text + '80'}
          style={[styles.input, { color: theme.colors.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {bags.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <LiveBagScreen bags={bags} onStopTracking={handleStopTracking} />
            {recentBags.length > 0 && (
              <View style={styles.recentBagsContainer}>
                <RecentBags removedBags={recentBags} onDeleteBag={handleDeleteBag} />
              </View>
            )}
          </>
        )}
      </ScrollView>

      <FloatingActionButton 
        onPress={() => navigation.navigate('AddBag', { onAddBag: handleAddBag })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
  },
  recentBagsContainer: {
    marginTop: 24,
    marginBottom: 80,
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
});

export default HomeScreen;
