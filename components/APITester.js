import React, { useState } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import { api } from '../config/api';

const APITester = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (test, success, data) => {
    setResults(prev => [...prev, { test, success, data, timestamp: new Date() }]);
  };

  const runTests = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      // Test active bags
      const bags = await api.getActiveBags();
      addResult('Get Active Bags', true, `Found ${bags.length} bags`);

      if (bags.length > 0) {
        const testBag = bags[0];

        // Test bag details
        const details = await api.getBagDetails(testBag._id);
        addResult('Get Bag Details', true, 'Details retrieved');

        // Test bag history
        const history = await api.getBagHistory(testBag._id);
        addResult('Get Bag History', true, `Found ${history.length} history entries`);

        // Test status update
        const update = await api.updateBagStatus(testBag._id, 'testing', 'API Test');
        addResult('Update Status', true, 'Status updated');
      }

      // Test profile
      const profile = await api.getUserProfile();
      addResult('Get Profile', true, 'Profile retrieved');

    } catch (error) {
      addResult('API Tests', false, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Button 
        title={isLoading ? "Testing..." : "Run API Tests"} 
        onPress={runTests}
        disabled={isLoading}
      />
      <ScrollView style={{ marginTop: 10 }}>
        {results.map((result, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {result.test}: {result.success ? '✅' : '❌'}
            </Text>
            <Text>{result.data}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default APITester;
