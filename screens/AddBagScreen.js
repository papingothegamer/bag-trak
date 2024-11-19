import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

const generateTrackingCode = (airportCode) => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `BTRK-${randomNumber}-${airportCode}`;
};

export default function AddBagScreen({ navigation, route }) {
  const { isDarkMode, theme } = useTheme();
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

  const locationRef = useRef(null);
  const flightRef = useRef(null);
  const airportCodeRef = useRef(null);
  const weightRef = useRef(null);
  const destinationRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const airlineRef = useRef(null);

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

  const handleAddBag = () => {
    if (trackingNumber && location && flight && weight && airline && 
        destination && flightStartTime && flightEndTime) {
      
      const today = new Date().toISOString().split('T')[0];
      const startDateTime = new Date(`${today} ${flightStartTime}`);
      const endDateTime = new Date(`${today} ${flightEndTime}`);

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        Alert.alert('Error', 'Please enter valid times in HH:MM format');
        return;
      }

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

  const renderInput = (ref, placeholder, value, onChangeText, keyboardType = 'default', half = false) => (
    <View style={half ? styles.halfInputContainer : styles.fullInputContainer}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{placeholder}</Text>
      <TextInput
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          half ? styles.halfInput : styles.fullInput,
          { borderColor: theme.colors.border, color: theme.colors.text, backgroundColor: theme.colors.background }
        ]}
        placeholderTextColor={theme.colors.text + '50'}
        keyboardType={keyboardType}
        returnKeyType="next"
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Add a new bag</Text>
          
          {renderInput(locationRef, "Location", location, setLocation)}
          {renderInput(flightRef, "Flight", flight, setFlight)}
          
          <View style={styles.row}>
            {renderInput(airportCodeRef, "Airport Code", airportCode, setAirportCode, 'default', true)}
            {renderInput(weightRef, "Weight (kg)", weight, setWeight, 'numeric', true)}
          </View>
          
          <View style={styles.row}>
            {renderInput(destinationRef, "Destination", destination, setDestination, 'default', true)}
            {renderInput(airlineRef, "Airline", airline, setAirline, 'default', true)}
          </View>
          
          <View style={styles.row}>
            {renderInput(startTimeRef, "Start Time (HH:MM)", flightStartTime, setFlightStartTime, 'numbers-and-punctuation', true)}
            {renderInput(endTimeRef, "End Time (HH:MM)", flightEndTime, setFlightEndTime, 'numbers-and-punctuation', true)}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleGenerateTrackingCode}
          >
            <Text style={styles.buttonText}>Generate Tracking Code</Text>
          </TouchableOpacity>

          {generatedTrackingCode ? (
            <View style={styles.trackingCodeContainer}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Tracking Number</Text>
              <Text style={[styles.trackingCode, { color: theme.colors.primary }]}>{generatedTrackingCode}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary, marginTop: 20 }]}
            onPress={handleAddBag}
          >
            <Text style={styles.buttonText}>Add Bag</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  fullInputContainer: {
    marginBottom: 16,
  },
  halfInputContainer: {
    flex: 0.48,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  fullInput: {
    width: '100%',
  },
  halfInput: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackingCodeContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  trackingCode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});