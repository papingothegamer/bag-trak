import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { api } from '../config/api';
import LiveBagList from '../components/layout/LiveBagList';

export default function LiveBagScreen({ navigation }) {
  const [bags, setBags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBags();
  }, []);

  const loadBags = async () => {
    try {
      setIsLoading(true);
      const activeBags = await api.getActiveBags();
      setBags(activeBags);
    } catch (error) {
      console.error('Load bags error:', error);
      Alert.alert('Error', 'Could not load your bags');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <LiveBagList 
        bags={bags} 
        onStopTracking={handleStopTracking}
        onBagPress={(bagId) => navigation.navigate('BagDetails', { bagId })}
      />
    </View>
  );
}