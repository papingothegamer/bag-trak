import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BagCard from '../components/ui/BagCard';
import RecentBags from './RecentBags';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import { useTheme } from '../components/ThemeContext';
import ScreenLayout from '../components/layout/ScreenLayout';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmptyState = () => {
  const { theme } = useTheme();
  return (
    <ScreenLayout>
      <View style={styles.emptyStateContainer}>
        <MaterialIcons name="luggage" size={64} color={theme.colors.primary} />
        <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
          No bags being tracked
        </Text>
        <Text style={[styles.emptyStateSubtext, { color: theme.colors.text }]}>
          Tap the + button to start tracking a bag
        </Text>
      </View>
    </ScreenLayout>
  );
};

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [bags, setBags] = useState([]);
  const [recentBags, setRecentBags] = useState([]);
  const [expandedBagId, setExpandedBagId] = useState(null);

  const handleStopTracking = async (bagId) => {
    const bagToRemove = bags.find(bag => bag.id === bagId);
    if (bagToRemove) {
      setBags(bags.filter(bag => bag.id !== bagId));
      const bagWithTimestamp = { ...bagToRemove, stoppedAt: new Date().toLocaleString() };
      setRecentBags(prevBags => [bagWithTimestamp, ...prevBags]);

      const existingBags = await AsyncStorage.getItem('loggedBags');
      const loggedBags = existingBags ? JSON.parse(existingBags) : [];
      loggedBags.push(bagWithTimestamp);
      await AsyncStorage.setItem('loggedBags', JSON.stringify(loggedBags));
    }
  };

  const handleDeleteBag = (bagId) => {
    setRecentBags(prevBags => prevBags.filter(bag => bag.id !== bagId));
  };

  const handleAddBag = useCallback((newBag) => {
    setBags(prevBags => [newBag, ...prevBags]);
  }, []);

  const handleBagPress = (bagId) => {
    setExpandedBagId(currentId => currentId === bagId ? null : bagId);
  };

  const renderRightActions = (progress, dragX, bagId) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => handleDeleteBag(bagId)}
        style={[styles.deleteButton, { backgroundColor: theme.colors.danger }]}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <MaterialIcons 
            name="delete" 
            size={28} 
            color={theme.dark ? theme.colors.background : theme.colors.text} 
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {bags.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {bags.map(bag => (
              <BagCard
                key={bag.id || bag._id}
                bag={bag}
                isLive={true}
                progress={bag.progress || 0}
                isExpanded={expandedBagId === (bag.id || bag._id)}
                onPress={() => handleBagPress(bag.id || bag._id)}
                onStopTracking={() => handleStopTracking(bag.id || bag._id)}
              />
            ))}
          </>
        )}
        
        {recentBags.length > 0 && (
          <View style={styles.recentBagsContainer}>
            <Text style={[styles.recentBagsTitle, { color: theme.colors.text }]}>Recent Bags</Text>
            {recentBags.map(bag => (
              <Swipeable
                key={bag.id || bag._id}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, bag.id || bag._id)}
                rightThreshold={-100}
              >
                <BagCard
                  bag={bag}
                  isLive={false}
                />
              </Swipeable>
            ))}
          </View>
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
  recentBagsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
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
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});

export default HomeScreen;