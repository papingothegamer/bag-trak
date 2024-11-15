import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../components/ThemeContext'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'expo';

const generateTrackingCode = (airportCode) => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  return `BTRK-${randomNumber}-${airportCode}`;
};

export default function AddBagScreen({ navigation, route }) {
  const { isDarkMode, theme } = useTheme(); // Access theme
  const [trackingNumber, setTrackingNumber] = useState('');
  const [location, setLocation] = useState('');
  const [flight, setFlight] = useState('');
  const [airportCode, setAirportCode] = useState('');
  const [weight, setWeight] = useState('');
  const [airline, setAirline] = useState('');
  const [destination, setDestination] = useState('');
  const [flightStartTime, setFlightStartTime] = useState('');
  const [flightEndTime, setFlightEndTime] = useState('');
  const [generatedTrackingCode, setGeneratedTrackingCode] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const { setBags } = route.params; // Get the setBags function from route params


  const handleGenerateTrackingCode = () => {
    if (airportCode) {
      const code = generateTrackingCode(airportCode);
      setGeneratedTrackingCode(code);
      setTrackingNumber(code);
    } else {
      Alert.alert('Error', 'Please enter the airport code');
    }
  };

  const handleInputSubmit = (nextInputRef) => {
    nextInputRef?.current?.focus();
  };

  const locationRef = useRef(null);
  const flightRef = useRef(null);
  const airportCodeRef = useRef(null);
  const weightRef = useRef(null);
  const destinationRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const airlineRef = useRef(null);

  const handleAddBag = () => {
    if (trackingNumber && location && flight && weight && airline && 
        destination && flightStartTime && flightEndTime) {
      
      // Create proper Date objects for the times
      const today = new Date().toISOString().split('T')[0]; // Get current date
      const startDateTime = new Date(`${today} ${flightStartTime}`);
      const endDateTime = new Date(`${today} ${flightEndTime}`);

      // Validate times
      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        Alert.alert('Error', 'Please enter valid times in HH:MM format');
        return;
      }

      // If end time is before start time, assume it's for the next day
      if (endDateTime < startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      const newBag = {
        id: trackingNumber,
        location,
        flight,
        weight,
        airline,
        from: airportCode,
        to: destination,
        startTime: startDateTime.getTime(),
        endTime: endDateTime.getTime(),
        timestamp: Date.now(),
      };

      route.params?.onAddBag(newBag);
      
      Alert.alert('Success', 'Bag added successfully', [{
        text: 'OK',
        onPress: () => {
          // Clear form and navigate back
          setTrackingNumber('');
          setLocation('');
          setFlight('');
          setWeight('');
          setAirline('');
          setAirportCode('');
          setDestination('');
          setFlightStartTime('');
          setFlightEndTime('');
          navigation.goBack();
        }
      }]);
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.titleText }]}>Add a new bag</Text>
      
      {/* Full width forms */}
      <TextInput
        ref={locationRef}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        returnKeyType="done"
        onSubmitEditing={() => handleInputSubmit(flightRef)}
        blurOnSubmit={false}
      />

      <TextInput
        ref={flightRef}
        placeholder="Flight"
        value={flight}
        onChangeText={setFlight}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        returnKeyType="done"
        onSubmitEditing={() => handleInputSubmit(airportCodeRef)}
        blurOnSubmit={false}
      />

      {/* Bento-style smaller forms */}
      <View style={styles.row}>
        <TextInput
          ref={airportCodeRef}
          placeholder="Airport Code"
          value={airportCode}
          onChangeText={setAirportCode}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          returnKeyType="done"
          onSubmitEditing={() => handleInputSubmit(weightRef)}
          blurOnSubmit={false}
        />
        <TextInput
          ref={weightRef}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => handleInputSubmit(destinationRef)}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          ref={destinationRef}
          placeholder="Destination Airport"
          value={destination}
          onChangeText={setDestination}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          returnKeyType="done"
          onSubmitEditing={() => handleInputSubmit(startTimeRef)}
          blurOnSubmit={false}
        />
        <TextInput
          ref={startTimeRef}
          placeholder="Start Time (HH:MM)"
          value={flightStartTime}
          onChangeText={setFlightStartTime}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="numbers-and-punctuation"
          returnKeyType="done"
          onSubmitEditing={() => handleInputSubmit(endTimeRef)}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          ref={endTimeRef}
          placeholder="End Time (HH:MM)"
          value={flightEndTime}
          onChangeText={setFlightEndTime}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="numbers-and-punctuation"
          returnKeyType="done"
          onSubmitEditing={() => handleInputSubmit(airlineRef)}
          blurOnSubmit={false}
        />
        <TextInput
          ref={airlineRef}
          placeholder="Airline"
          value={airline}
          onChangeText={setAirline}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          returnKeyType="done"
          onSubmitEditing={() => handleGenerateTrackingCode()}
        />
      </View>

      <Button title="Generate Tracking Code" onPress={handleGenerateTrackingCode} color={theme.colors.primary} />
      {generatedTrackingCode ? (
        <TextInput
          placeholder="Tracking Number"
          value={generatedTrackingCode}
          style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          editable={false}
        />
      ) : null}
      <Button title="Add Bag" onPress={handleAddBag} color={theme.colors.primary} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  smallInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    flex: 0.48,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  scannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  closeButton: {
    padding: 10,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  trackingInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackingInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  scanButton: {
    padding: 10,
  },
});
