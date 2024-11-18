import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { api } from '../config/api';

const BagDetailsScreen = ({ route, navigation }) => {
  const { bagId } = route.params;
  const [bagDetails, setBagDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadBagDetails();
  }, [bagId]);

  const loadBagDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const details = await api.getBagDetails(bagId);
      setBagDetails(details);
    } catch (error) {
      setError('Failed to load bag details');
      Alert.alert('Error', 'Could not load bag details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus, location) => {
    try {
      setIsUpdating(true);
      await api.updateBagStatus(bagId, newStatus, location);
      // Reload details after update
      await loadBagDetails();
      Alert.alert('Success', 'Bag status updated');
    } catch (error) {
      Alert.alert('Error', 'Could not update bag status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Something went wrong</Text>
        <Button title="Try Again" onPress={loadBagDetails} />
      </View>
    );
  }

  // ... rest of your render code ...
};

export default BagDetailsScreen;
