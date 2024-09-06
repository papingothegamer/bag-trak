import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext'; // Import useTheme
import * as Notifications from 'expo-notifications'; // Import Notifications

const screenWidth = Dimensions.get('window').width; // Get screen width for the progress bar width

const ProgressBar = ({ progress }) => {
  const bagPosition = useRef(new Animated.Value(0)).current; // Animated value for the bag's position

  useEffect(() => {
    // Animate the bag position as the progress changes
    Animated.timing(bagPosition, {
      toValue: progress * screenWidth, // Move the bag along the width of the screen
      duration: 1000, // Adjust duration based on how fast the update should happen
      useNativeDriver: true,
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressBarContainer}>
      {/* Progress Bar */}
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />

      {/* Bag Icon Overlay */}
      <Animated.View style={[styles.bagIcon, { transform: [{ translateX: bagPosition }] }]}>
        <MaterialIcons name="luggage" size={24} color="purple" />
      </Animated.View>
    </View>
  );
};

const LiveBagScreen = ({ bags, onStopTracking }) => {
  const { theme } = useTheme(); // Access theme
  const [expandedBagId, setExpandedBagId] = useState(null);
  const [animatedHeight] = useState(new Animated.Value(60)); // Initial height (compressed)

  const toggleExpand = (id) => {
    const isExpanding = expandedBagId !== id;
    setExpandedBagId(isExpanding ? id : null);

    Animated.timing(animatedHeight, {
      toValue: isExpanding ? 200 : 60, // Adjust these values based on desired expanded and collapsed heights
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const notifyUser = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Bag Ready for Pickup',
        body: 'Your bag is ready to be picked up at the collection point.',
      },
      trigger: null, // Instant trigger
    });
  };

  const calculateProgress = (startTime, endTime) => {
    const now = Date.now();
  
    if (!startTime || !endTime || startTime >= endTime) {
      return 0; // Return 0 if times are invalid
    }
  
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
  
    const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1); // Clamp progress between 0 and 1

    // Call notifyUser if progress reaches 100%
    if (progress >= 1) {
      notifyUser();
    }

    return progress;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { color: theme.colors.titleText }]}>Live Bags</Text>
      {bags.length > 0 ? (
        bags.map(bag => {
          const progress = calculateProgress(bag.startTime, bag.endTime);

          return (
            <TouchableOpacity key={bag.id} onPress={() => toggleExpand(bag.id)} style={styles.bagCard}>
              <Animated.View style={[styles.cardContent, { height: animatedHeight }]}>
                {/* Bag ID */}
                <Text style={styles.bagId}>Bag ID: {bag.id}</Text>

                {/* Progress bar with MaterialIcons bag icon */}
                <ProgressBar progress={progress} />

                {/* Expanded details */}
                {expandedBagId === bag.id && (
                  <View style={styles.expandedDetails}>
                    <Text style={styles.expandedDetailText}>Flight Time: {bag.flightTime}</Text>
                    <Text style={styles.expandedDetailText}>Weight: {bag.weight}</Text>
                    <Text style={styles.expandedDetailText}>Airline: {bag.airline}</Text>
                    <Text style={styles.expandedDetailText}>Route: {bag.from} - {bag.to}</Text>
                    <TouchableOpacity onPress={() => onStopTracking(bag.id)}>
                      <Text style={styles.stopTrackingText}>Stop Tracking</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })
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
    backgroundColor: '#007BFF',
    marginBottom: 15,
    width: '100%',
    overflow: 'hidden', // Ensure content is clipped within the rounded corners
  },
  cardContent: {
    width: '100%',
  },
  bagId: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    position: 'relative', // Position relative to allow absolute positioning of the icon
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'blue', // Color of the progress bar
  },
  bagIcon: {
    position: 'absolute',
    top: -10, // Position the icon slightly above the progress bar
    left: 0, // Start the icon at the beginning of the bar
  },
  expandedDetails: {
    marginTop: 20,
  },
  expandedDetailText: {
    color: 'white', // Set expanded bag details text color to white
    marginBottom: 5,
  },
  stopTrackingText: {
    marginTop: 10,
    color: 'red',
  },
  noBagsText: { fontSize: 18, color: 'grey', marginTop: 20 },
});

export default LiveBagScreen;
