import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LiveBagScreen from './LiveBagScreen';
import RecentBags from './RecentBags'; // Ensure the import is correct
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Access theme
  const isDarkMode = theme.dark;
  const [bags, setBags] = useState([]);
  const [recentBags, setRecentBags] = useState([]);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="settings-outline" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <TextInput 
          placeholder="Search bags..."
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          style={[
            styles.input,
            { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' },
          ]}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddBag', { setBags })}>
          <Ionicons name="add-circle-outline" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <LiveBagScreen bags={bags} onStopTracking={handleStopTracking} />

      {recentBags.length > 0 && (
        <View style={styles.recentBagsContainer}>
          <RecentBags removedBags={recentBags} onDeleteBag={handleDeleteBag} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 10, // Add space between the search bar and icons
  },
  recentBagsContainer: {
    marginTop: 20,
    marginBottom: 50, // Adjust as needed
  },
});

export default HomeScreen;
