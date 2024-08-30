import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import useTheme
import LiveBagScreen from './LiveBagScreen'; // Import LiveBagScreen
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons for the plus sign

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Access theme
  const isDarkMode = theme.dark;
  const [bags, setBags] = useState([
    {
      id: 'BTRK-2447AK',
      weight: '20KG',
      airline: 'QATAR',
      from: 'LOS',
      to: 'DOH',
      flightTime: '3h05min',
    },
    // Add more initial bag objects if needed or start with an empty array.
  ]);

  const stopTracking = (id) => {
    const updatedBags = bags.filter(bag => bag.id !== id);
    setBags(updatedBags);
  };

  const deleteBag = (id) => {
    const updatedBags = bags.filter(bag => bag.id !== id);
    setBags(updatedBags);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TextInput 
          placeholder="Search bags..."
          style={[
            styles.input,
            { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' },
          ]}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddBag')}>
          <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {bags.length > 0 && (
        <LiveBagScreen
          bags={bags}
          onStopTracking={stopTracking}
          onDeleteBag={deleteBag}
        />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default HomeScreen;
