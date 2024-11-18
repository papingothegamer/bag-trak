import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const PROGRESS_BAR_WIDTH = screenWidth - 72;
const ICON_SIZE = 20;
const PROGRESS_BAR_HEIGHT = 8;

const BagCard = ({ 
  bag = {},
  isLive = false,
  progress = 0,
  isExpanded = false,
  onPress,
  onStopTracking 
}) => {
  if (!bag) {
    return null;
  }

  const bagPosition = useRef(new Animated.Value(0)).current;
  const expandAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLive) {
      const validProgress = Number.isFinite(progress) ? progress : 0;
      const maxTranslation = PROGRESS_BAR_WIDTH - ICON_SIZE - 32;
      const toValue = validProgress * maxTranslation;
      
      if (Number.isFinite(toValue)) {
        Animated.timing(bagPosition, {
          toValue,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [progress, isLive]);

  useEffect(() => {
    if (isLive) {
      Animated.timing(expandAnimation, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded, isLive]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return '--:--';
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '--:--';
    }
  };

  const calculateFlightDuration = () => {
    if (!bag.startTime || !bag.endTime) return '--';
    try {
      const start = new Date(bag.startTime);
      const end = new Date(bag.endTime);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return '--';
      
      const durationMs = end - start;
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } catch (error) {
      console.error('Error calculating duration:', error);
      return '--';
    }
  };

  const ProgressBar = () => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      <Animated.View 
        style={[
          styles.bagIconContainer, 
          { transform: [{ translateX: bagPosition }] }
        ]}
      >
        <View style={styles.bagIconCircle}>
          <MaterialIcons name="luggage" size={12} color="#4A90E2" />
        </View>
      </Animated.View>
    </View>
  );

  if (!isLive) {
    // Stopped Bag Card
    return (
      <View style={[styles.bagCard, styles.stoppedBagCard]}>
        <Text style={styles.bagId}>Bag ID: {bag.id}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>Flight: {bag.flight}</Text>
          <Text style={styles.detailText}>Route: {bag.from} - {bag.to}</Text>
          <Text style={styles.detailText}>Status: Tracking Completed</Text>
        </View>
      </View>
    );
  }

  // Live Bag Card
  const expandedHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  const expandedOpacity = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.bagCard, styles.liveBagCard]}
    >
      <View style={styles.cardContent}>
        <Text style={styles.bagId}>Bag ID: {bag.id}</Text>
        <View style={styles.flightTimeContainer}>
          <Text style={styles.timeText}>
            {formatTime(bag.startTime)} - {formatTime(bag.endTime)}
          </Text>
          <Text style={styles.durationText}>
            Flight Duration: {calculateFlightDuration()}
          </Text>
        </View>
        <ProgressBar />
        <Animated.View style={[styles.expandedDetails, { height: expandedHeight, opacity: expandedOpacity }]}>
          <Text style={styles.expandedDetailText}>Flight: {bag.flight}</Text>
          <Text style={styles.expandedDetailText}>Weight: {bag.weight}kg</Text>
          <Text style={styles.expandedDetailText}>Airline: {bag.airline}</Text>
          <Text style={styles.expandedDetailText}>Route: {bag.from} → {bag.to}</Text>
          <TouchableOpacity 
            onPress={() => onStopTracking(bag.id)}
            style={styles.stopTrackingButton}
          >
            <Text style={styles.stopTrackingText}>Stop Tracking</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bagCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  liveBagCard: {
    backgroundColor: '#4A90E2',
  },
  stoppedBagCard: {
    backgroundColor: '#808080',
  },
  cardContent: {
    width: '100%',
  },
  bagId: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
  },
  flightTimeContainer: {
    marginBottom: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  durationText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  progressBarContainer: {
    width: '100%',
    height: PROGRESS_BAR_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: PROGRESS_BAR_HEIGHT / 2,
    position: 'relative',
    marginVertical: 8,
    overflow: 'visible',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: PROGRESS_BAR_HEIGHT / 2,
  },
  bagIconContainer: {
    position: 'absolute',
    top: -((ICON_SIZE - PROGRESS_BAR_HEIGHT) / 2),
    left: -ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bagIconCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  expandedDetails: {
    overflow: 'hidden',
  },
  expandedDetailText: {
    color: 'white',
    marginBottom: 6,
    fontSize: 14,
  },
  stopTrackingButton: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  stopTrackingText: {
    color: 'white',
    fontWeight: '600',
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

export default BagCard;