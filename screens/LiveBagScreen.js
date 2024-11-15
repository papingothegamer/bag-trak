import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import LiveBagCard from '../components/ui/LiveBagCard';
import StoppedBagCard from '../components/ui/StoppedBagCard';

export default function LiveBagScreen({ bags = [], onStopTracking }) {
  const { theme } = useTheme();
  const [expandedBagId, setExpandedBagId] = useState(null);
  const animatedHeights = useRef(new Map()).current;

  const calculateProgress = useCallback((startTime, endTime) => {
    const now = Date.now();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    
    if (isNaN(start) || isNaN(end)) return 0;
    if (now < start) return 0;
    if (now > end) return 1;
    
    return Math.min(Math.max((now - start) / (end - start), 0), 1);
  }, []);

  const toggleExpand = (bagId) => {
    const heightAnim = animatedHeights.get(bagId);
    const isExpanding = expandedBagId !== bagId;
    
    if (expandedBagId && expandedBagId !== bagId) {
      const currentAnim = animatedHeights.get(expandedBagId);
      if (currentAnim) {
        Animated.timing(currentAnim, {
          toValue: 80,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }

    if (heightAnim) {
      Animated.timing(heightAnim, {
        toValue: isExpanding ? 220 : 80,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    setExpandedBagId(isExpanding ? bagId : null);
  };

  const sortedBags = [...bags].sort((a, b) => b.timestamp - a.timestamp);
  const liveBags = sortedBags.filter(bag => calculateProgress(bag.startTime, bag.endTime) < 1);
  const stoppedBags = sortedBags.filter(bag => calculateProgress(bag.startTime, bag.endTime) >= 1);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.headerText, { color: theme.colors.titleText }]}>Live Bags</Text>
      {liveBags.map(bag => (
        <LiveBagCard
          key={bag.id}
          bag={bag}
          progress={calculateProgress(bag.startTime, bag.endTime)}
          isExpanded={expandedBagId === bag.id}
          animatedHeight={animatedHeights.get(bag.id)}
          onPress={() => toggleExpand(bag.id)}
          onStopTracking={onStopTracking}
        />
      ))}
      
      {stoppedBags.length > 0 && (
        <>
          <Text style={[styles.headerText, { color: theme.colors.titleText }]}>Completed</Text>
          {stoppedBags.map(bag => (
            <StoppedBagCard key={bag.id} bag={bag} />
          ))}
        </>
      )}
      
      {bags.length === 0 && (
        <Text style={[styles.noBagsText, { color: theme.colors.secondaryText }]}>
          No bags are currently being tracked.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noBagsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});